// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./StandardToken.sol";

contract Token is StandardToken {


    string public name  = "AIR Token";
    string public symbol = "AIR";
    uint256 public decimals = 18;
    uint256 public maxSupply;


    constructor(uint256 _maxSupply) public {
        maxSupply = _maxSupply;
    }

    function mint(uint256 _amount) onlyOwner public returns (bool success) {
        require(maxSupply >= (_totalSupply+_amount));
        _totalSupply = _totalSupply+_amount;
        balances[msg.sender] = balances[msg.sender]+_amount;
        emit Transfer(address(0), msg.sender, _amount);
        return true;
    }
    function getName() public returns (string memory) {
        return name;

    }

}