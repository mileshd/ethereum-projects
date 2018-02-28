pragma solidity ^0.4.18;

contract Lottery {
    address public manager;
    address[] public players;
    
    // Constructor function
    function Lottery() public {
        // msg is global variable
        // msg.sender is sender address
        manager = msg.sender;
    }
    
    function enter() public payable {
        // for validation
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        // block, now are global variables
        return uint(keccak256(block.difficulty, now, players));  
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    // function modifier
    modifier restricted () {
        require(msg.sender == manager);
        // where to put the modified function's code
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
}
