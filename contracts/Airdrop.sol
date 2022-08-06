// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interface/IAirdrop.sol";
import "./ClientAddress.sol";
import "./AirToken.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract AirDrop is IAirdrop, Ownable {

    ClientAddress public clientAddress;
    
    AirToken public airToken;

    constructor(address  _airTokenAddress, address payable contractAddress) {
        airToken = AirToken(_airTokenAddress);
        clientAddress = ClientAddress(contractAddress);
        
    }

    /*
    Airdrop function which take up a array of address, single token amount and eth amount and call the
    transfer function to send the token plus send eth to the address is balance is 0
   */
    function doAirDrop(uint256 _amount) onlyOwner external returns (bool) {
        
        uint count = clientAddress.getCount();
        address payable [] memory clientList = new address payable [](10);
        clientList = clientAddress.getClientAddress();
        for (uint256 i = 0; i < count; i++)
        {
            /* calling transfer function from contract */
            airToken.transfer(clientList[i], _amount);
            
        }
    }

    // function doAirDrop(uint256 _amount, uint256 _ethAmount) onlyOwner external returns (bool) {
    //     uint count = clientAddress.getCount();
    //     address payable [] memory clientList = new address payable [](10);
    //     clientList = clientAddress.getClientAddress();
    //     for (uint256 i = 0; i < count; i++)
    //     {
    //         /* calling transfer function from contract */
    //         airToken.transfer(clientList[i], _amount);
    //         if((clientList[i].balance == 0) && (address(this).balance >= _ethAmount))
    //         {
    //             require(clientList[i].send(_ethAmount));

    //         }
    //     }
    // }

    function sendBath(address payable [] calldata _recipients, uint[] calldata _values) onlyOwner external returns (bool success) {
        require(_recipients.length == _values.length);
        for (uint i = 0; i <_values.length; i++) {
            airToken.transfer(_recipients[i], _values[i]);
        }
        return true;
    }

    function destroyContract (address payable _contract) onlyOwner external {
        selfdestruct(_contract);
    }
    
    function getAddress ()  external view returns (address) {
        return address(this);
    }

    function getClientList() external view returns (address payable[] memory){
    
        return clientAddress.getClientAddress();
    }

    function getBalance(address payable _address) external view returns (uint) {
        return airToken.balanceOf(_address);
    }
}
