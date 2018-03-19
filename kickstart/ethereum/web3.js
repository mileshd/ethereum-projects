import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and have Meta Mask installed
  // Use provider injected into browser from Meta Mask
  web3 = new Web3(window.web3.currentProvider)
} else {
  // We are on the server *OR* the user is not running Meta Mask
  const infuraURL = 'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q';
  const provider = new Web3.providers.HttpProvider(
    infuraURL
  );
  web3 = new Web3(provider);
}

export default web3;
