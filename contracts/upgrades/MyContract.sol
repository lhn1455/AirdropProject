// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BaseContract.sol";

contract MyContract is BaseContract {
    uint256 public x;

    function initialize(uint256 _x) public initializer {
        BaseContract.initialize(); // Do not forget this call!
        x = _x;
    }
}