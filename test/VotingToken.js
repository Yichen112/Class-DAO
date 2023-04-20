// SPDX-License-Identifier: MIT

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingToken", function () {
  let VotingToken, votingToken, GovernanceLogic, governanceLogic;
  let owner, minter, nonMinter, tokenHolder;
  const name = "Dauphine DAO";
  const symbol = "DTK";
  const tokenId = 1;

  beforeEach(async function () {
    [owner, minter, nonMinter, tokenHolder] = await ethers.getSigners();
    VotingToken = await ethers.getContractFactory("VotingToken");
    votingToken = await VotingToken.connect(owner).deploy();
    await votingToken.deployed();
    await votingToken.connect(owner).safeMint(tokenHolder.address, tokenId);
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await votingToken.name()).to.equal(name);
      expect(await votingToken.symbol()).to.equal(symbol);
    });

    it("Should set the default admin role to the contract owner", async function () {
      expect(
        await votingToken.hasRole(ethers.constants.HashZero, owner.address)
      ).to.equal(true);
    });

    it("Should grant the minter role to the contract owner", async function () {
      expect(
        await votingToken.hasRole(
          await votingToken.MINTER_ROLE(),
          owner.address
        )
      ).to.equal(true);
    });
  });

  describe("Token minting", function () {
    it("Should allow a minter to mint new tokens", async function () {
      await votingToken.connect(owner).safeMint(nonMinter.address, tokenId + 1);
      expect(await votingToken.balanceOf(nonMinter.address)).to.equal(1);
    });
  });
});
