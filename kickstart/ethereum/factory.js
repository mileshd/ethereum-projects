import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const deployedAddress = '0x706293D3DB769488091587D21BC17E24BBc3672d'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  deployedAddress
);

export default instance;
