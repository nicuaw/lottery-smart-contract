const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
    // Define test cases here
  });



let lottery;

beforeEach(async function () {
  const Lottery = await ethers.getContractFactory("Lottery");
  lottery = await Lottery.deploy(100); // set minimum bet to 100 wei
  await lottery.deployed();
});

it("Should allow players to enter the lottery", async function () {
    // call the enter function with the minimum bet
    await lottery.enter({ value: 100 });
  
    // get the list of players
    const players = await lottery.getPlayers();
  
    // expect the list to contain the player's address
    expect(players).to.contain(await ethers.provider.getSigner().getAddress());
  });
  
  it("Should not allow players to enter with less than the minimum bet", async function () {
    // call the enter function with a value less than the minimum bet
    await expect(lottery.enter({ value: 99 })).to.be.revertedWith("Minimum bet not met.");
  });
  
  it("Should not allow non-manager to select the winner", async function () {
    // call the selectWinner function with a non-manager address
    await expect(lottery.connect(await ethers.getSigner()).selectWinner()).to.be.revertedWith(
      "Only the manager can perform this action."
    );
  });
  
