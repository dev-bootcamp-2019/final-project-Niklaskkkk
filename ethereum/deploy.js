const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CharityFactory.json');

const provider = new HDWalletProvider(
  'your own 12 words from metamask',
  'https://rinkeby.infura.io/v3/ef3a9e95cb12482d9885a38b7bbdc80f'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();


//I have already deplyed a contract on rinkeby, but feel free to deploy
//your own version: Contract deployed to 0x31fD63F98B9eAA520C2DAc5C9Ed71118Fc2747F8
