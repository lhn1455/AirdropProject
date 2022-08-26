// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAirdrop {

  
   function initialize (address payable _clientAddress, address payable _airToken) external;
   function doAirDrop(address payable tokenHolder, uint256 _amount) external returns (bool);
   function getClientAddress() external view returns (address payable[] memory);
   function transfer(address payable account, address to, uint256 amount) external  returns (bool);
   function getTokenMinterBalance(address account) external view returns (uint256);
    
} 



 
