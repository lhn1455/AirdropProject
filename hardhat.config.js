require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  networks: {
    dev: {
      url: `http://localhost:8545`,
      chainId: 1337, // config standard
    },

    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRI_KEY],
      // gasPrice: 470000000000,
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY
    },
  },
  solidity: "0.8.9",
};

