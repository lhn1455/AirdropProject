// scripts/upgrade_box_v2.js

const { ethers, upgrades } = require("hardhat");

const PROXY = "0xaecfD134764a3d48242a62385a40731ac3643e8f"; // 프록시 컨트랙트

async function main() {
    const AirDropV2 = await ethers.getContractFactory("AirDropV2");
    console.log("Upgrading AirDrop...");
    await upgrades.upgradeProxy(PROXY, AirDropV2);
    console.log("AirDropV2 upgraded");
}

main();


