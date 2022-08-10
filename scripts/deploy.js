const hre = require("hardhat");

async function main() {
  const [ deployer ] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const AirToken = await hre.ethers.getContractFactory("AirToken");
  const AirDrop = await hre.ethers.getContractFactory("AirDrop");
  const ClientAddress = await hre.ethers.getContractFactory("ClientAddress");

  const airToken = await AirToken.deploy();
  const clientAddress = await ClientAddress.deploy();
  const airDrop = await AirDrop.deploy();
  await airDrop.initialize(airToken.address, clientAddress.address);

  await airDrop.doAirDrop(15);
  const clientList2 = await airDrop.getClientAddress();
  for (let i =0; i < clientList2.length; i++){
      console.log("clientListFromAirdop : ", clientList2[i]);
      const balances = await airDrop.getBalance(clientList2[i]);
      console.log("balances : ", balances)
  }
  return { airDrop, airToken, deployer, clientAddress};

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });