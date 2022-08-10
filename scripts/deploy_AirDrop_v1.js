const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

async function main() {
    const AirToken = await hre.getContractFactory("AirToken");
    const AirDrop = await hre.getContractFactory("AirDrop");
    const ClientAddress = await hre.getContractFactory("ClientAddress");

    const airToken = await AirToken.deploy();
    const clientAddress = await ClientAddress.deploy();
    // const airDrop = await AirDrop.deploy(airToken.address, clientAddress.address);
    console.log("Deploying Airdrop...");

    const airdrop = await upgrades.deployProxy(AirDrop, [ airToken.address, clientAddress.address ], {
        initializer: "initialize",
    });

    await airdrop.deployed();

    console.log("Proxy contract address (airDrop deployed to) : ", airdrop.address);

}
main();

