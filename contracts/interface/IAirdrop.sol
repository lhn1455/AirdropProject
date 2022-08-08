// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAirdrop {

    function doAirDrop(uint256 _amount)  external returns (bool success) ;
    function sendBath(address payable [] calldata _recipients, uint[] calldata _values) external returns (bool success) ;
    function destroyContract (address payable _contract) external;
    function getClientAddress() external view returns (address payable[] memory);
    function getBalance(address payable _address) external view returns (uint);
} 