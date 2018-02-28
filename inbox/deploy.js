// Which account we want to use, and which node we want to connect to
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// contains public and private key, can generate many accounts when put through algorithm
const accountMnemonic = 'primary team major mix gold that stove valley remember reopen solid chest';
const infuraNetworkAndAPIToken = 'https://rinkeby.infura.io/t0Tpd7fusRwBGWWqtMOM';

const provider = new HDWalletProvider(
  accountMnemonic,
  infuraNetworkAndAPIToken
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address);
};

deploy()
