/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.18",
};

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.YOUR_PROJECT_ID}`,
      accounts: [`0x${process.env.YOUR_PRIVATE_KEY}`]
    },
    celo: {
      url: "https://forno.celo.org",
      chainId: 42220,
      gasPrice: 10e9,
      accounts: [`0x${process.env.YOUR_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
