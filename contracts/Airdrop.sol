// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interface/IAirdrop.sol";
import "./Token.sol";
import "../../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract AirDrop is Ownable, IAirdrop {

    Token public tokenInstance;

    constructor(address payable _tokenAddress) public {
        tokenInstance = Token(_tokenAddress);
    }

    /*
    Airdrop function which take up a array of address, single token amount and eth amount and call the
    transfer function to send the token plus send eth to the address is balance is 0
   */
    function doAirDrop(address payable[] calldata _address, uint256 _amount, uint256 _ethAmount) onlyOwner external override returns (bool) {
        uint256 count = _address.length;
        for (uint256 i = 0; i < count; i++)
        {
            /* calling transfer function from contract */
            tokenInstance.transfer(_address[i], _amount);
            if((_address[i].balance == 0) && (address(this).balance >= _ethAmount))
            {
                require(_address[i].send(_ethAmount));
            }
        }
    }

    function sendBath(address payable [] calldata _recipients, uint[] calldata _values) onlyOwner external override returns (bool) {
        require(_recipients.length == _values.length);
        for (uint i = 0; i <_values.length; i++) {
            tokenInstance.transfer(_recipients[i], _values[i]);
        }
        return true;
    }

    function destroyContract (address payable _contract) onlyOwner external {
        selfdestruct(_contract);
    }
}
