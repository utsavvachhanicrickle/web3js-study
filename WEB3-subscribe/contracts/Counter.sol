// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    // 🔥 EVENT
    event CountUpdated(address user, uint256 newCount);

    function increment() public {
        count++;

        emit CountUpdated(msg.sender, count);
    }

    function decrement() public {
        count--;

        emit CountUpdated(msg.sender, count);
    }
}