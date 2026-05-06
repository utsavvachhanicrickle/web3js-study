// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {

    struct Job {
        address client;
        address freelancer;
        uint256 amount;
        bool completed;
        bool approved;
    }

    uint public jobCount;
    mapping(uint => Job) public jobs;

    event JobCreated(uint jobId, address client, uint amount);
    event JobAccepted(uint jobId, address freelancer);
    event WorkSubmitted(uint jobId);
    event PaymentReleased(uint jobId);

    function createJob() public payable {
        require(msg.value > 0, "Send ETH");

        jobCount++;

        jobs[jobCount] = Job(
            msg.sender,
            address(0),
            msg.value,
            false,
            false
        );

        emit JobCreated(jobCount, msg.sender, msg.value);
    }

    function acceptJob(uint jobId) public {
        Job storage job = jobs[jobId];
        require(job.freelancer == address(0), "Already taken");

        job.freelancer = msg.sender;

        emit JobAccepted(jobId, msg.sender);
    }

    function submitWork(uint jobId) public {
        Job storage job = jobs[jobId];
        require(msg.sender == job.freelancer, "Not freelancer");

        job.completed = true;

        emit WorkSubmitted(jobId);
    }

    function approvePayment(uint jobId) public {
        Job storage job = jobs[jobId];

        require(msg.sender == job.client, "Not client");
        require(job.completed, "Work not done");
        require(!job.approved, "Already paid");

        job.approved = true;

        payable(job.freelancer).transfer(job.amount);

        emit PaymentReleased(jobId);
    }
}