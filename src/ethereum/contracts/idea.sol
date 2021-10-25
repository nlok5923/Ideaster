pragma solidity ^0.4.17;

contract ideaFactory {
    address[] public deployedIdeas;
    mapping(address => uint256) userBalance;
    mapping(address => address[]) userIdeaMapping;
    
    event ideaDeployed(address _from, string title, string description);

    function createIdeas(
        string title,
        string description,
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
        
        userIdeaMapping[msg.sender].push(newIdea);
        deployedIdeas.push(newIdea);
        ideaDeployed(msg.sender, title, description);
    }

    function depositBalance() public payable {
        //msg.sender
        userBalance[msg.sender] += msg.value;
    }

    function getUserBalance(address userAddress) public view returns (uint256) {
        return userBalance[userAddress];
    }

    function allIdeas() public view returns (address[] memory) {
        return deployedIdeas;
    }

    function getAllMyIdeas(address userAddress)
        public
        view
        returns (address[] memory)
    {
        return userIdeaMapping[userAddress];
    }
}

contract idea {
    struct Review {
        string description;
        uint256 approvalCount;
        string title;
        address recipient;
        // address[] baggers;
    }

    string ideaDescription;
    string ideaTitle;
    uint256 ideaResponses;
    uint256 ideaAmt;
    uint256 ideaAgeMax;
    uint256 ideaAgeMin;
    uint256 ideaThreshold;
    uint256 ideaBalance;
    // string state;
    // string gender;
    // string[] ideaTypes;
    address ideaManager;
    mapping(address => bool) reviewers;
    Review[] public reviews;
    address[] public reviewersAddress;

    function depositBalanceToIdea() public payable {
        //msg.sender
        require(msg.value >= ideaAmt);
        ideaBalance += msg.value;
    }

    function getIdeaBalance() public view returns (uint256) {
        return ideaBalance;
    }

    function rewardReviewer(address reviewerAddress, uint256 rewardAmt) public {
        reviewerAddress.transfer(rewardAmt);
    }

    // age, city, country, gender, profession, terms, state
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
        // address[] emptyArray;
        Review memory newReview = Review({
            description: description,
            recipient: msg.sender,
            approvalCount: 0,
            title: title
            // baggers: emptyArray
        });
        reviewers[msg.sender] = true;
        reviews.push(newReview);
    }

    function approveReview(uint256 index) public {
        require(reviewers[msg.sender]);
        reviewersAddress.push(msg.sender);
        // reviews[index].baggers.push(msg.sender);
        Review storage currentReview = reviews[index];
        currentReview.approvalCount = currentReview.approvalCount + 1;
    }

    function getAllReviewers() public view returns (address[] memory) {
        return reviewersAddress;
    }

    function getSummary()
        public
        view
        returns (
            string,
            string,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            ideaTitle,
            ideaDescription,
            ideaManager,
            reviews.length,
            ideaAmt,
            ideaAgeMax,
            ideaAgeMin,
            ideaThreshold
        );
    }
}