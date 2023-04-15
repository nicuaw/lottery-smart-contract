pragma solidity ^0.8.18;

contract Lottery {
    address payable[] public players;
    address public manager;
    uint public minimumBet;
    uint public randomSeed;
    uint public winningIndex;

    constructor(uint _minimumBet) {
        manager = msg.sender;
        minimumBet = _minimumBet;
        randomSeed = block.timestamp; // use block timestamp as the initial random seed
    }

    function enter() public payable {
        require(msg.value >= minimumBet, "Minimum bet not met.");
        players.push(payable(msg.sender));
    }

    function selectWinner() public restricted {
        require(players.length > 0, "No players entered.");
        
        // Generate a random number based on the block hash and random seed
        bytes32 randomHash = keccak256(abi.encodePacked(blockhash(block.number - 1), randomSeed));
        uint randomNumber = uint(randomHash) % players.length;
        winningIndex = randomNumber;

        // Transfer the winnings to the winner
        players[winningIndex].transfer(address(this).balance);
        
        // Reset the game
        players = new address payable[](0);
        randomSeed = uint(keccak256(abi.encode(randomHash, blockhash(block.number - 1))));
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can perform this action.");
        _;
    }
}
