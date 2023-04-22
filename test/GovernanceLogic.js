const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GovernanceLogic", () => {
  let governanceLogic;
  let votingToken;
  let proposer;
  let proposerAddress;
  let nonProposer;

  // Before each test, deploy new instances of the contracts and set up some test accounts.
  beforeEach(async () => {
    // Deploy a new VotingToken contract.
    const VotingToken = await ethers.getContractFactory("VotingToken");
    votingToken = await VotingToken.deploy();

    // Deploy a new GovernanceLogic contract with the voting token contract's address as the constructor argument.
    const GovernanceLogic = await ethers.getContractFactory("GovernanceLogic");
    governanceLogic = await GovernanceLogic.deploy(votingToken.address);

    // Get the first account as the proposer.
    [proposer] = await ethers.getSigners();
    proposerAddress = proposer.address;

    // Get a second account as a non-proposer.
    [nonProposer] = await ethers.getSigners();
  });

  // Test the initialization of the contract.
  it("should be initialized correctly", async () => {
    expect(await governanceLogic.name()).to.equal("GovernanceLogic");
  });
});

// Deploy a new GovernanceLogic contract with the voting token contract's address as the constructor argument.
const GovernanceLogic = await ethers.getContractFactory("GovernanceLogic");
const deploymentTx = await GovernanceLogic.getDeployTransaction(votingToken.address);
const deploymentCost = await ethers.provider.estimateGas(deploymentTx);
governanceLogic = await GovernanceLogic.deploy(votingToken.address);
const deploymentReceipt = await governanceLogic.deployTransaction.wait();
const deployedAddress = governanceLogic.address;

console.log(`GovernanceLogic deployed at: ${deployedAddress}`);
console.log(`Gas used for deployment: ${deploymentReceipt.gasUsed.toString()}, gas cost: ${deploymentReceipt.gasUsed.mul(deploymentReceipt.effectiveGasPrice).toString()}`);
