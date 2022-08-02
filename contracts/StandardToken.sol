pragma solidity ^0.8.0;

import "../../../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../../node_modules/@openzeppelin/contracts/security/Pausable.sol";
import "../../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract StandardToken is IERC20, Pausable, Ownable {
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    uint256 public _totalSupply;

    /**
   * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) external whenNotPaused returns (bool success) {
        require(balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]);
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
    * @dev Transfer tokens from one address to another
    * @param _from address The address which you want to send tokens from
    * @param _to address The address which you want to transfer to
    * @param _value uint256 the amout of tokens to be transfered
    */
    function transferFrom(address _from, address _to, uint256 _value) external whenNotPaused returns (bool success) {
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]);
        balances[_to] = balances[_to]+_value;
        balances[_from] = balances[_from]-_value;
        allowed[_from][msg.sender] = allowed[_from][msg.sender]-_value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param _owner The address to query the the balance of.
    * @return balance An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address _owner) external override view returns (uint256 balance) {
        return balances[_owner];
    }

    /**
    * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
    * This only works when the allowance is 0. Cannot be used to change allowance.
    * https://github.com/ethereum/EIPs/issues/738#issuecomment-336277632
    * @param _spender The address which will spend the funds.
    * @param _value The amount of tokens to be spent.
    */
    function approve(address _spender, uint256 _value) external whenNotPaused returns (bool success) {
        require(allowed[msg.sender][_spender] == 0);
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
    * @dev Function to check the amount of tokens that an owner allowed to a spender.
    * @param _owner address The address which owns the funds.
    * @param _spender address The address which will spend the funds.
    * @return remaining A uint256 specifing the amount of tokens still available for the spender.
    */
    function allowance(address _owner, address _spender)external override view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    /**
     * To increment allowed value is better to use this function.
     * From MonolithDAO AirToken.sol
     */
    function increaseApproval(address _spender, uint _addedValue) whenNotPaused public returns (bool) {
        allowed[msg.sender][_spender] = allowed[msg.sender][_spender]+_addedValue;
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

    function decreaseApproval(address _spender, uint _subtractedValue) whenNotPaused public returns (bool) {
        uint oldValue = allowed[msg.sender][_spender];
        if (_subtractedValue > oldValue) {
            allowed[msg.sender][_spender] = 0;
        } else {
            allowed[msg.sender][_spender] = oldValue-_subtractedValue;
        }
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

    function totalSupply() external override view returns (uint256) {
        return _totalSupply;
    }
}


