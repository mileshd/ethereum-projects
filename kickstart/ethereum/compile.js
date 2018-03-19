const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
// Read file as utf8 encoding
const source = fs.readFileSync(campaignPath, 'utf8')
// Only care about contracts that were just compiled
const output = solc.compile(source, 1).contracts

fs.ensureDirSync(buildPath);

for (let contract in output) {
  // name, body
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  )
}
