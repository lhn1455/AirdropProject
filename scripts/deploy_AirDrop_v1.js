const { ethers, upgrades } = require("hardhat");

async function main() {
    const AirToken = await ethers.getContractFactory("AirToken");
    const AirDrop = await ethers.getContractFactory("AirDrop");
    const Client = await ethers.getContractFactory("ClientAddress");
    console.log("Deploying contracts");

    
    const client = await Client.deploy();
    const airToken = await AirToken.deploy("AirToken", "AIR");

    const airDrop = await upgrades.deployProxy(AirDrop, [ client.address, airToken.address ], {
        initializer: "initialize",
    });

    

    const clientList = await airDrop.getClientAddress();
        for (let i =0; i < clientList.length; i++){
            console.log("clientListFromAirdop : ", clientList[i]);
            const beforeBalances = await airToken.balanceOf(clientList[i]);
            console.log("beforeBalances : ", beforeBalances);
         
        }

    console.log("Proxy contract address (AirDrop deployed to) : ", airDrop.address);
    console.log("logicContract-AirDrop.sol address :  ", AirDrop.address )
    console.log("client : ", await airToken.name());
    console.log("Symbol : ", await airToken.symbol());
    console.log("totalSupply : ", await airToken.totalSupply());
    console.log("beforeBalance Of tokenHolder: ", await airDrop.getTokenMinterBalance(airToken.address));
    // await airDrop.doAirDrop(airToken.address,15); 

   
    for (let i =0; i < clientList.length; i++){
        console.log("clientListFromAirdop : ", clientList[i]);
        const afterBalances = await airToken.balanceOf(clientList[i]);
        console.log("afterBalances : ", afterBalances)
    }
    console.log("Afterbalance Of tokenHolder: ", await airDrop.getTokenMinterBalance(airToken.address));

}
main();







