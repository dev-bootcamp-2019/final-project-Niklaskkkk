pragma solidity ^0.4.17;

//Two contracts, but CharityFactory is only deployed once as it is used
//to produce new charities.



// Title CharityFactory
//Create the initial contract which is used to produce new individual charities
//deployedCharities has overview of all deployed charities through this factory
//which can be reached with the deployedCharities function
//createCharity function create new instance of the Charity contract with a set minimum contribution
contract CharityFactory {
    address[] public deployedCharities;

    function createCharity(uint minimum) public {
        address newCharity = new Charity(minimum, msg.sender);
        deployedCharities.push(newCharity);
    }

    function getDeployedCharities() public view returns (address[]) {
        return deployedCharities;
    }
}

//Title Charity
//COntract which represent an individual charity funding (what specific users of
//Dapp will use, by calling function createCharity in CharityFactory-contract)
//

contract Charity {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
//Title CONSTRUCTOR (NB: this is the constructor, but due to the solidity version used the "constructor" has same name
//as the contract itself. The constructor parameteres is derived from the
// "createCharity" function in the charityFactory contract)
    function Charity(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
//Title contribute
//Allows anyone to contribute to the charity, but requre value above minimumContribution set by Charity creator
    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }
//Title createRequest
//Allows creator of Charity to ask for request to spend funds to given destination (address)
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }
//Title approveRequest
//Allows only those who contributed to charity, to approve a specific funding
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
//Title finalizeRequest
//Allos only the manager of the charity to finalize and send a transfer from charity contract
//to external contract, but only once enough approvers accepted the request
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
//title getSummary
//Used to derive information from specific charity-contract to the UI
    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
