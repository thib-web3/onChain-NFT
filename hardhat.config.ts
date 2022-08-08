import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';
import "@nomiclabs/hardhat-ethers";
import * as dotenv from 'dotenv';

dotenv.config();
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const MNEMONIC = process.env.MNEMONIC
const config: HardhatUserConfig = {

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      // accounts: [privateKey1, privateKey2, ...]
      saveDeployments: true
    },
  },
  solidity: {
    version: "0.8.9"
  },
  namedAccounts: {
    deployer: 0,
  },
  
};

export default config;
