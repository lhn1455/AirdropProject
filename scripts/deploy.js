const hre = require("hardhat");

async function main() {
  const [ deployer ] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  // console.log("client1 address", client1.address)
  // console.log("client2 address", client2.address)
  // console.log("client3 address", client3.address)
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const AirToken = await ethers.getContractFactory("AirToken");
  const airToken = await AirToken.deploy();

  console.log("Token address:", airToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });