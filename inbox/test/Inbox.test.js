const assert = require('assert');
// local ethereum test network
const ganache = require('ganache-cli');
// gives us programmatic access to contracts in our test network
const Web3 = require('web3'); // Constructor function
// Provider is a communication layer between Web3 and the ethereum network
const provider = ganache.provider();
const web3 = new Web3(provider);
// Compile our contract
const { interface, bytecode } = require('../compile');

let accounts
let inbox

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi There!'] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi There!');
  })

  it('can change the message', async () => {
    // .send -> send transaction, from: who is paying the gas to modify data in our contract
    // contracts are accounts controlled by code.
    const receipt = await inbox.methods.setMessage('Bye There').send({ from: accounts[0] });
    //console.log(receipt)
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye There');
  })
});
