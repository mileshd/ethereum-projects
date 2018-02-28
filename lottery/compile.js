'use strict';

const path = require('path'); // gives cross platform compatabilty
const fs = require('fs');
const solc = require('solc')

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8')

// contract path and number of contracts
// { interface, bytecode }
const compiledContract = solc.compile(source, 1).contracts[':Lottery']

module.exports = compiledContract
