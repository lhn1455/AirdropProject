const jsonData = require("../.openzeppelin/rinkeby.json");
const { ethers, upgrades } = require("hardhat");



const PROXY = jsonData.proxies[0].address; // 프록시 컨트랙트
console.log("proxy contract : ", jsonData.proxies[0].address);

async function main() {
    const AirDropV2 = await ethers.getContractFactory("AirDropV2");
    console.log("Upgrading AirDrop...");
    await upgrades.upgradeProxy(PROXY, AirDropV2);
    console.log("AirDropV2 upgraded");
}

main();


