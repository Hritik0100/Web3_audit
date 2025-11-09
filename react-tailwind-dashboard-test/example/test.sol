// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MixedVulnerabilities {

    // State variables
    mapping(address => uint) public balances;
    uint public totalSupply;
    address public owner;
    bool public paused;

    constructor() {
        owner = msg.sender;
        totalSupply = 1000;
        paused = false;
    }

    // Vulnerable deposit function (no access control or checks)
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // Vulnerable withdraw function (Reentrancy & Overflow)
    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient funds");

        // Reentrancy vulnerability: external call before state update
        payable(msg.sender).transfer(_amount);
        
        // Vulnerable to overflow/underflow issues
        balances[msg.sender] -= _amount;
    }

    // Vulnerable transfer function (no access control)
    function transfer(address _to, uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient funds");

        // Unchecked transfer without proper validation or owner control
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    // Vulnerable to integer overflow/underflow due to unchecked operations
    function increaseSupply(uint _amount) public {
        totalSupply += _amount; // Vulnerable to overflow
    }

    function decreaseSupply(uint _amount) public {
        totalSupply -= _amount; // Vulnerable to underflow
    }

    // Vulnerable access control (only owner can pause contract)
    function pause() public {
        require(msg.sender == owner, "Not the owner");  // Access control issue
        paused = true;
    }

    // Vulnerable to unauthorized access (no access control for unpause)
    function unpause() public {
        paused = false;  // Anyone can unpause it, no access control
    }

    // Function to simulate an attacker reentrancy
    function attackWithdraw(address _victim) public {
        uint victimBalance = balances[_victim];
        require(victimBalance > 0, "Victim has no funds");

        // This will trigger reentrancy attack if the victim's contract calls back
        withdraw(victimBalance);
    }

    // Fallback function for an attacker's reentrancy exploit
    fallback() external payable {
        if (address(this).balance > 0) {
            // Attacker re-enters withdraw function
            withdraw(msg.sender.balance);
        }
    }
}

