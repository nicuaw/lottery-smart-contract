// based on template of https://ethereum.org/en/developers/tutorials/hello-world-smart-contract/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: `${API_URL}`,
      account: PRIVATE_KEY
    }
  },
}