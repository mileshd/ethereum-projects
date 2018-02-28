// @format

import web3 from './web3';

// Address Contract Instance is deployed to on Test Network
// Deployed From deploy script in lottery/project
const address = '0x7afA2A2447C78F6103C5659Fe1f8943e6CE9b9bA';

// Allow Web 3 library to interact with Contract on Network
// Application Binary Interface
const abi = [
  {
    constant: true,
    inputs: [],
    name: 'manager',
    outputs: [{name: '', type: 'address'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getPlayers',
    outputs: [{name: '', type: 'address[]'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'enter',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{name: '', type: 'uint256'}],
    name: 'players',
    outputs: [{name: '', type: 'address'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
];

// Build local Representation of Contract deployed to the Blockcahin
export default new web3.eth.Contract(abi, address);
