import Web3 from 'web3';

// Create Web3 instance with provider from MetaMask, installed
// as Browser extension
const web3 = new Web3(window.web3.currentProvider);

export default web3;
