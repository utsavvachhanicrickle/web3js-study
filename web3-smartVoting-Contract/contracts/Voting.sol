// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    uint256 public yesVotes;
    uint256 public noVotes;

    mapping(address => bool) public hasVoted;

    function voteYes() public {
        require(!hasVoted[msg.sender], "Already voted");

        yesVotes++;
        hasVoted[msg.sender] = true;
    }

    function voteNo() public {
        require(!hasVoted[msg.sender], "Already voted");

        noVotes++;
        hasVoted[msg.sender] = true;
    }
}