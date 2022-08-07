const { ethers, upgrades } = require("hardhat");

async function main() {
    const AirToken = await ethers.getContractFactory("AirToken");
    const AirDrop = await ethers.getContractFactory("AirDrop");
    const ClientAddress = await ethers.getContractFactory("ClientAddress");

    const airToken = await AirToken.deploy();
    const clientAddress = await ClientAddress.deploy();
    const airDrop = await AirDrop.deploy(airToken.address, clientAddress.address);
    console.log("Deploying Airdrop...");

    const airdrop = await upgrades.deployProxy(airDrop, {
        initializer: "initialize",
    });

    await airDrop.deployed();

    console.log("Proxy contract address (airDrop deployed to) : ", airDrop.address);

}
main();

