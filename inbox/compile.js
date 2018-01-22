'use strict';

const path = require('path'); // gives cross platform compatabilty
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8')

// contract path and number of contracts
const compiledContract = solc.compile(source, 1).contracts[':Inbox']

module.exports = compiledContract
