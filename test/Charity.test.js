const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CharityFactory.json');
const compiledCharity = require('../ethereum/build/Charity.json');

let accounts;
let factory;
let charityAddress;
let charity;

beforeEach(async () => {
//Gets test-accounts from the ganache-blockchain
  accounts = await web3.eth.getAccounts();

//Deploy the initial Factory-contract, which enable creation of new charities.
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode })
  .send({ from: accounts[0], gas: '1000000'});

//Create Charity-Campaign & set a minimum contribution for contributions('100').
  await factory.methods.createCharity('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [charityAddress] = await factory.methods.getDeployedCharities().call();
  charity = await new web3.eth.Contract(
    JSON.parse(compiledCharity.interface),
    charityAddress
  );
});

//  TESTS START HERE -------------------------------------->

//Both contracts are so closely related to tests for both of them are written here.
//The first test check that CampaignFactory is deployed correctly. Rest of the TESTS
//Are around the functionality of the Campaign contract (which is the code for individual
//charity-campaigns).

//The project use the Mocha test tool. To execute the tests write in the command line
// "npm run test"

describe('Charities', () => {
  //Test1: Check that both contracts have been deployed, by checking that both have addresses.
  it('deploys a factory and a charity', () => {
    assert.ok(factory.options.address);
    assert.ok(charity.options.address);
  });
//Test2: Check that the caller of a new charity campaign is the manager of that campaign
  it('marks caller as the charity manager', async () => {
    const manager = await charity.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
//Test3: Check that the contribute method works, which allow other people (addresses)
//to send money to the charity funding. But also require the value above minimum requirements.
//Uses pre-created addresses by ganache, in this case accounts[1]. Calls the approvers mapping
//to see if accounts[1] is there (bool value). Assert will fail if value is false.
  it('allows people to contribute money and marks them as approvers', async () => {
    await charity.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isContributor = await charity.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });
//Test4: Test that contributions below minimum requirements set by charity creator, is failing
//catch(err). Try to send contribution of '10', but minimum value is set to '100'.
  it('requires a minimum contribution', async () => {
    try {
      await charity.methods.contribute().send({
        value: '5',
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
//Test5: Checks that charity creator can make a payment request (for some purchase/charity-destination)
//In this case to buy filters to clean polluted water. The request is for a payment to accounts[2],
//Lets imagine this is "Water Filter Company". The test match that the made request is found in the
//contract struct and the description matches request.description (do not test rest of the struct).
  it('allows a manager to make a payment request', async () => {
    await charity.methods
    .createRequest('Filter for clean water', '100', accounts[2])
    .send({
      from: accounts[0],
      gas: '1000000'
    });
    const request = await charity.methods.requests(0).call();

    assert.equal('Filter for clean water', request.description);
  });
//Test6: Test the whole process, from contribute to charity to create request for payment.
//Further it test that the approve request works and that the payment request can be finalized.
//The last part check that the value sent to accounts[5] has received 5ETH, but value has to be converted
//from string to int, and from wei to ETH. We cant match exactly amount due to limitation in Ganache,
//as the accounts[] values do not reset after each test-run. Logs "balances" for additional confirmation.
  it('processes requests', async () => {
    await charity.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await charity.methods
    .createRequest('Medical supplies', web3.utils.toWei('5', 'ether'), accounts[5])
    .send({ from: accounts[0], gas: '1000000' });

    await charity.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    await charity.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[5]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
