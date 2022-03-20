import { ethers } from "ethers";
import { marketAddress, nftAddress } from "../../config";
import NFT from "../../../hardhat/artifacts/contracts/HeraCollection.sol/HeraCollection.json";
import Market from "../../../hardhat/artifacts/contracts/Marketplace.sol/Marketplace.json";

export const rpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RINKEBY_URL
);

export function getMarketContract(signer) {
  let provider = rpcProvider;
  if (signer) {
    provider = signer;
  }
  return new ethers.Contract(marketAddress, Market.abi, provider);
}

export function getTokenContract(signer) {
  let provider = rpcProvider;
  if (signer) {
    provider = signer;
  }
  return new ethers.Contract(nftAddress, NFT.abi, provider);
}