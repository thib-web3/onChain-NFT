import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import fs from 'fs'
import { ethers } from 'hardhat';
import {config}  from '../helper-hardhat-config';
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const {deployments, getNamedAccounts, getChainId} = hre;
  const {deploy, log} = deployments;

  const chainId = await getChainId()
  const {deployer} = await getNamedAccounts();
 log("---------------------------------------")
  const SVGNFT = await deploy('SVGNFT', {
    from: deployer,
    log: true,
  });
  log(`You have deployed an NFT contract to ${SVGNFT.address}`)
  let filepath = "./img/circle.svg"
  let svg = fs.readFileSync(filepath, {encoding:"utf8"})

  const svgNFTContract = await ethers.getContractFactory("SVGNFT") //will get contract informations about svg nft
  const accounts = await hre.ethers.getSigners()
  const signer = accounts[0]
  const svgNFT = new ethers.Contract(SVGNFT.address, svgNFTContract.interface, signer) //our new contract
  const networkName = config.networkConfig[chainId]['name']
  log(`Verify with: \n npx hardhat verify --network ${networkName} ${svgNFT.address}`)

  let tx = await svgNFT.create(svg)
  let receipt = await tx.wait(1)
  log(`I've made an NFT !`)
  log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`) // 0 means the NFT token URI
};
export default func;