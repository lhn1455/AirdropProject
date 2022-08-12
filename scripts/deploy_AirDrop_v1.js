
const { ethers, upgrades } = require("hardhat");

//오픈제플린-업그레이드 임포트 에러

async function main() {
    const AirToken = await ethers.getContractFactory("AirToken");
    const AirDrop = await ethers.getContractFactory("AirDrop");
    const ClientAddress = await ethers.getContractFactory("ClientAddress");

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

