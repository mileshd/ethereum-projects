const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  const contractFactoryABI = JSON.parse(compiledFactory.interface);
  factory = await new web3.eth.Contract(contractFactoryABI)
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  const minimumCampaignContribution = '100';
  // Transaction returns 'transaction reciept'
  await factory.methods.createCampaign(minimumCampaignContribution)
    .send({ from: accounts[0], gas: '1000000' });

  // Destructuring from Array, ES2106
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
  const campaignABI = JSON.parse(compiledCampaign.interface);

  campaign = await new web3.eth.Contract(
    campaignABI,
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    // Why no gas here?
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });

    // pass in address, so it will return the value from the Solidity mapping
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    // pass if true, fail if false
    assert(isContributor)
  });

  it('requires a minimum contribution', async () => {
    try {
      // Why no gas here?
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1]
      });
      // Test automatically fail
      assert(false);
    } catch (err) {
      assert(err);  
    }
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('Buy Batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    const request = await campaign.methods.requests(0).call();

    assert.equal('Buy Batteries', request.description);
  });

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: '1000000' });

    await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: '1000000' });

    const balanceInWei = await web3.eth.getBalance(accounts[1]);
    const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
    const balance = parseFloat(balanceInEther);

    console.log(balance);
    assert(balance > 104);
  });
});
