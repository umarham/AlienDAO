const { ethers } = require("hardhat");
const { ALIEN_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
    // Deploy the FakeNFTMarketplace contract first
    const FakeNFTMarketplace = await ethers.getContractFactory("FakeNFTMarketplace");
    const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
    await fakeNftMarketplace.deployed();

    console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

    // Now deploy the AlienDAO contract
    const AlienDAO = await ethers.getContractFactory("AlienDAO");
    const alienDAO = await AlienDAO.deploy(
      fakeNftMarketplace.address,
      ALIEN_NFT_CONTRACT_ADDRESS, 
      { 
        // This assumes your account has at least 1 ETH in it's account
        // Change this value as you want
        value: ethers.utils.parseEther("0.1"), 
      }
    );

    await alienDAO.deployed();

    console.log("AlienDAO deployed to: ", alienDAO.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });