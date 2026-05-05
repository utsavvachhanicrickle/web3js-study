// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public myNumber;

    constructor(uint256 _num) {
        myNumber = _num;
    }

    function setMyNumber(uint256 _num) public {
        myNumber = _num;
    }

    function increment() public {
        myNumber += 1;
    }
}