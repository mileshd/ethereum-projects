import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const deployedAddress = '0x7D7f1e48655a81FC7aDa748C48034C9839930e30'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  deployedAddress
);

export default instance;
