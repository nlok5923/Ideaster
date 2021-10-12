// pragma solidity ^0.4.17;

// contract CampaignFactory {
//     address[] public deployedCampaigns;

//     function createCampaign(uint256 minimum) public {
//         // it should receive min contribution
//         // little gotcha
//         // if manager will be mrked as factory but manager is eprson who wnt to create a new campaign
//         address newCampaign = new Campaign(minimum, msg.sender);
//         deployedCampaigns.push(newCampaign);
//     }

//     function getDeployedCampaigns() public view returns (address[]) {
//         return deployedCampaigns;
//     }
// }

// contract Campaign {
//     struct Request {
//         string description;
//         uint256 value;
//         address recipient;
//         bool complete;
//         uint256 approvalCount;
//         mapping(address => bool) approvals;
//     }

//     //we want people to know manager
//     Request[] public requests;
//     address public manager;
//     uint256 public minimumContribution;
//     mapping(address => bool) public approvers;
//     uint256 public approversCount = 0;

//     //here we put our modifier

//     modifier restricted() {
//         require(msg.sender == manager);
//         _;
//     }

//     function Campaign(uint256 minimum, address creator) public {
//         //here msg.sender is the factory
//         //msg global variable
//         manager = creator;
//         minimumContribution = minimum;
//     }

//     //when someone send some money to contract we will contribute function

//     function contribute() public payable {
//         // they should pass money greater than minimumContribution

//         //msg.value is amount in wei
//         require(msg.value > minimumContribution);
//         // approvers.push(msg.sender);
//         approvers[msg.sender] = true;
//         approversCount++;
//     }

//     //idea of spending request
//     //manager call create request function to create a spending request
//     //manager need to justify the request
//     //this justification we will store in description

//     // jisko money jayega vo hai recipient

//     //allowing manager to create a request of type request

//     function createRequest(
//         string description,
//         uint256 value,
//         address recipient
//     ) public restricted {
//         // require(msg.sender === manager); this is embedded in restricted modifier
//         Request memory newRequest = Request({
//             description: description,
//             value: value,
//             recipient: recipient,
//             complete: false,
//             approvalCount: 0
//         });

//         //we used key value pair to define a struct

//         //alternative syntax to creatte struct but not recommended to used
//         //in below format we only define the values but not the key

//         // based on having consistent order of field for using the below format
//         // so it's all about the order why we are not using this syntac

//         // Request(description, value, recipient, false);
//         requests.push(newRequest);
//     }

//     function approveRequests(uint256 index) public {
//         //person must have donated if he s using this function and he must not have already approved it
//         // if both return true
//         Request storage request = requests[index];
//         require(approvers[msg.sender]);
//         // if user already approved then we kick him out
//         require(!request.approvals[msg.sender]);

//         request.approvals[msg.sender] = true;
//         request.approvalCount++;
//     }

//     function finalizeRequest(uint256 index) public restricted {
//         //only manager can call this
//         // this request must not already marked as complete
//         // once request finalize we will chnage complete to true as request has been done and pid to ventor
//         // if false then only we will proceed
//         Request storage req = requests[index];
//         require(req.approvalCount > (approversCount / 2));
//         require(!req.complete);
//         req.recipient.transfer(req.value);
//         req.complete = true;
//         //atleat 50% contributor should vote yes to complete this request
//     }

// function getSummary()
//     public
//     view
//     returns (
//         uint256,
//         uint256,
//         uint256,
//         uint256,
//         address
//     )
// {
//     //we need to return balance, min contribution, no of request, total request, no of contributor associated with contract
//     return (
//         minimumContribution,
//         this.balance,
//         requests.length,
//         approversCount,
//         manager
//     );
// }

//     //for another components
//     function getRequestCount() public view returns (uint256) {
//         return requests.length;
//     }
// }

// pragma solidity ^0.4.17;

// contract CampaignFactory {
//     address[] public deployedCampaigns;

//     function createCampaign(uint256 minimum) public {
//         // it should receive min contribution
//         // little gotcha
//         // if manager will be mrked as factory but manager is eprson who wnt to create a new campaign
//         address newCampaign = new Campaign(minimum, msg.sender);
//         deployedCampaigns.push(newCampaign);
//     }

//     function getDeployedCampaigns() public view returns (address[]) {
//         return deployedCampaigns;
//     }
// }

// contract Campaign {
//     struct Request {
//         string description;
//         uint256 value;
//         address recipient;
//         bool complete;
//         uint256 approvalCount;
//         mapping(address => bool) approvals;
//     }

//     //we want people to know manager
//     Request[] public requests;
//     address public manager;
//     uint256 public minimumContribution;
//     mapping(address => bool) public approvers;
//     uint256 public approversCount = 0;

//     //here we put our modifier

//     modifier restricted() {
//         require(msg.sender == manager);
//         _;
//     }

//     function Campaign(uint256 minimum, address creator) public {
//         //here msg.sender is the factory
//         //msg global variable
//         manager = creator;
//         minimumContribution = minimum;
//     }

//     //when someone send some money to contract we will contribute function

//     function contribute() public payable {
//         // they should pass money greater than minimumContribution

//         //msg.value is amount in wei
//         require(msg.value > minimumContribution);
//         // approvers.push(msg.sender);
//         approvers[msg.sender] = true;
//         approversCount++;
//     }

//     //idea of spending request
//     //manager call create request function to create a spending request
//     //manager need to justify the request
//     //this justification we will store in description

//     // jisko money jayega vo hai recipient

//     //allowing manager to create a request of type request

//     function createRequest(
//         string description,
//         uint256 value,
//         address recipient
//     ) public restricted {
//         // require(msg.sender === manager); this is embedded in restricted modifier
//         Request memory newRequest = Request({
//             description: description,
//             value: value,
//             recipient: recipient,
//             complete: false,
//             approvalCount: 0
//         });

//         //we used key value pair to define a struct

//         //alternative syntax to creatte struct but not recommended to used
//         //in below format we only define the values but not the key

//         // based on having consistent order of field for using the below format
//         // so it's all about the order why we are not using this syntac

//         // Request(description, value, recipient, false);
//         requests.push(newRequest);
//     }

//     function approveRequests(uint256 index) public {
//         //person must have donated if he s using this function and he must not have already approved it
//         // if both return true
//         Request storage request = requests[index];
//         require(approvers[msg.sender]);
//         // if user already approved then we kick him out
//         require(!request.approvals[msg.sender]);

//         request.approvals[msg.sender] = true;
//         request.approvalCount++;
//     }

//     function finalizeRequest(uint256 index) public restricted {
//         //only manager can call this
//         // this request must not already marked as complete
//         // once request finalize we will chnage complete to true as request has been done and pid to ventor
//         // if false then only we will proceed
//         Request storage req = requests[index];
//         require(req.approvalCount > (approversCount / 2));
//         require(!req.complete);
//         req.recipient.transfer(req.value);
//         req.complete = true;
//         //atleat 50% contributor should vote yes to complete this request
//     }

//     function getSummary()
//         public
//         view
//         returns (
//             uint256,
//             uint256,
//             uint256,
//             uint256,
//             address
//         )
//     {
//         //we need to return balance, min contribution, no of request, total request, no of contributor associated with contract
//         return (
//             minimumContribution,
//             this.balance,
//             requests.length,
//             approversCount,
//             manager
//         );
//     }

//     //for another components
//     function getRequestCount() public view returns (uint256) {
//         return requests.length;
//     }
// }

pragma solidity ^0.4.17;

contract ideaFactory {
    address[] public deployedIdeas;

    function createIdeas(
        string title,
        string description,
        // string[] types,
        uint256 responses,
        uint256 amt,
        uint256 ageMax,
        uint256 ageMin
    ) public {
        uint256 threshold = responses;
        address newIdea = new idea(
            title,
            description,
            responses,
            amt,
            ageMax,
            ageMin,
            threshold,
            msg.sender
        );
        deployedIdeas.push(newIdea);
    }

    function allIdeas() public view returns (address[] memory) {
        return deployedIdeas;
    }
}

contract idea {
    struct Review {
        string description;
        uint256 approvalCount;
        string title;
        address recipient;
    }

    string ideaDescription;
    string ideaTitle;
    uint256 ideaResponses;
    uint256 ideaAmt;
    uint256 ideaAgeMax;
    uint256 ideaAgeMin;
    uint256 ideaThreshold;
    // string[] ideaTypes;
    address ideaManager;
    mapping(address => bool) reviewers;
    Review[] public reviews;

    function idea(
        string title,
        string description,
        // string[] types,
        uint256 responses,
        uint256 amt,
        uint256 ageMax,
        uint256 ageMin,
        uint256 threshold,
        address creator
    ) public {
        ideaDescription = description;
        ideaTitle = title;
        // ideaTypes = types;
        ideaResponses = responses;
        ideaAmt = amt;
        ideaAgeMax = ageMax;
        ideaAgeMin = ageMin;
        ideaManager = creator;
        ideaThreshold = threshold;
    }

    function createReview(string description, string title) public {
        Review memory newReview = Review({
            description: description,
            recipient: msg.sender,
            approvalCount: 0,
            title: title
        });
        reviewers[msg.sender] = true;
        reviews.push(newReview);
    }

    function approveReview(uint256 index) public {
        require(reviewers[msg.sender]);

        Review storage currentReview = reviews[index];
        currentReview.approvalCount = currentReview.approvalCount + 1;
    }

    function getSummary()
        public
        view
        returns (
            string,
            string,
            address,
            uint256
        )
    {
        return (ideaTitle, ideaDescription, ideaManager, reviews.length);
    }
}
