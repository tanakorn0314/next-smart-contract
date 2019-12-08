pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

//["Taksin", "Yingluck", "Prayuth", "Trump", "Obama"]

contract Voting {
    
    struct Voter {
        bool voted;
        uint vote; // index of the voted candidate
        uint weight; // score to give a candidate
    }
    
    struct Candidate {
        string name; // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }
    
    address public owner;
    
    mapping(address => Voter) public voters;
    
    Candidate[] public candidates;
    
    constructor(string[] memory candidateNames) public {
        owner = msg.sender;
        voters[owner].weight = 1;

        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function numCandidate() public view returns (uint) {
        return candidates.length;
    }
    
    function giveRightToVote(address voter) public {
        require(msg.sender == owner, "Only chairperson can give right to vote.");
        require(!voters[voter].voted, "The voter already voted.");
        require(voters[voter].weight == 0, "The voter already has right");
        voters[voter].weight = 1;
    }
    
    function vote(uint candidate) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = candidate;

        candidates[candidate].voteCount += sender.weight;
    }
    
    function winningCandidate() public view returns (uint winningCandidate_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningCandidate_ = p;
            }
        }
    }
    
    function winnerName() public view returns (string memory) {
        return candidates[winningCandidate()].name;
    }
    
}