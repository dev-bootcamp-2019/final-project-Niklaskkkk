import web3 from './web3';
import CharityFactory from './build/CharityFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CharityFactory.interface),
  '0x31fD63F98B9eAA520C2DAc5C9Ed71118Fc2747F8'
);
//Address is from deploy.js file
export default instance;
