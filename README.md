Readme for Charity project – Final Project for Consensys Developer Course

1.Brief intro to project 
This Dapp is built with inspiration from how Kickstarter is, but with focus on how Charitable organizations raise & spend money. The Dapp tries to improve two issues which the Charitable industry faces today: * Do Charitable organizations spend the funds on the purpose actually promised? * How much of the funds collected are “eaten up” by administrative fees, salaries, marketing etc. by the Charitable organization? This is not a complete Dapp, only an initial prototype with focus on the first issue, what is the money collected spent on. For details on needed improvements to the Dapp please see section 5.
The current version of the Dapp allows anyone with metamask to create a funding for a chairitable purpose, for instance improve water quality in a region. After creating a Charity anyone with Metamask can contribute to the Charity. Then, the creator of the Charity can create “payment requests”, for instance to buy water filters from a specific vendor (ethereum address). Then, a certain number of those who contributed to the Charity has to accept the payment request (that it is in line with the goal & purpose of the charity) before the creator of the Charity can finalize the transfer of funds. Please see “Charity.sol” for specific comments on contract functionality.

2.Installations and set-up:
To run the project locally, please do the following installations below. If issues it might be your global truffle/solc versions overwriting, so try delete those & only use the once described below. The application has been developed & tested on Oracle VM VirtualBox, with system Ubuntu 16.04.
Once you have downloaded the project folder from github, go into the folder from terminal and run the following:

sudo apt update

sudo apt install nodejs npm

sudo apt install npm npm install --save ganache-cli mocha solc@0.4.17 fs-extra web3@1.0.0-beta.26

npm install --save truffle-hdwallet-provider

npm install --save next@4.1.4 react react-dom

npm install --save semantic-ui-react

npm install --save semantic-ui-css

npm install --save next-routes


3.Run tests, start application & compile/deploy:
3.1 Run tests: With terminal go into project folder and type “npm run test”. The tests will then execute from the test folder. You can look at the file “Charity.test.js” to see the code with comments.

3.2 Run app: There is already a deployed version of CharityFactory on Rinkeby: 0x31fD63F98B9eAA520C2DAc5C9Ed71118Fc2747F8 You can therefore access this contract through local node.js server by going into project folder and type “npm run dev”. The server will spin up the application on localhost: 3000. You can use Metamask to interact with it. Make sure to be on the Rinkeby network.

3.3 Compile and deploy own version: If you want to deploy a new version remember to put in your own 12 words from metamask in the "deploy.js" file. Then, go into the project folder “ethereum” with terminal and type “node compile.js”. This will build new versions of the contracts. Then in the same Ethereum-folder, type “node deploy.js”. This will deploy a new factory-contract on Rinkeby. The console will print the ethereum-address. Please remember to save that address and edit it in the “factory.js” file if you want to interact with it through the app.



4. Test, Design and Security See separate files:
- Campaign.test.js - design_pattern_desicions, - avoiding_common_attacks


5.Fully developmed Dapp and suggested improvements:
This project is only a prototype of a Dapp. Some important needed improvement to the application:

- Better description to end-user what the intended purpose of each Charity is
- Trusted register that show connection between ethereum address & organization/company behind the ethereum addresses. Particularly important forpayment requests.
- Extended functionality in Charity.sol that set requirements for total needed collection, maximum collection.
- Functionality in situations where requests do not get enough approvals or funds have stayd very long in the Charity-contract. There should be an automatic function that said “after x days” non-approved or unspend funds are sent back to the original charity-givers.
- Functionality that show users/contributors how much of the given funds are spent on Charity-administration/salaries etc. For instance lets say Charity X spends 10% of collected funds on administrative costs, contributors should see this easily. This should provide higher transparency and insentience Charitable organization to spend funds collected efficiently.
