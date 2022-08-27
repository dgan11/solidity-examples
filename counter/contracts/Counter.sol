// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    string public name = "";
    uint public count = 0;

    constructor(string memory _name, uint _count) {
        name = _name;
        count = _count;
    }

    function increment() public {
        count++;
    }

    function decrement() public {
        count--;
    }

    function getCount() public view returns(uint) {
        return count;
    }

    function getName() public view returns(string memory curName) {
        return name;
    }

    function setName(string memory _newName) public returns(string memory newName) {
        name = _newName;
        return name;
    }
}