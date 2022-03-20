import { ethers } from "hardhat";

async function main() {
  const Market = await ethers.getContractFactory("Marketplace");
  const market = await Market.deploy();

  await market.deployed();

  const SocialCryptoArt = await ethers.getContractFactory("SocialCryptoArt");
  const socialCryptoArt = await SocialCryptoArt.deploy(market.address);

  await socialCryptoArt.deployed();

  console.log("SocialCryptoArt deployed to:", socialCryptoArt.address);
  console.log("Marketplace deployed to:", market.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
