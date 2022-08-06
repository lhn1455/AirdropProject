const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");



describe('Airdrop', function() {
     async function deployAirdropContractSet() {
        const [ deployer ] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);
        
        const AirToken = await hre.ethers.getContractFactory("AirToken");
        const AirDrop = await hre.ethers.getContractFactory("AirDrop");
        const ClientAddress = await hre.ethers.getContractFactory("ClientAddress");
        
        
    
        const airToken = await AirToken.deploy();
        const clientAddress = await ClientAddress.deploy();
        const airDrop = await AirDrop.deploy(airToken.address, clientAddress.address);

        return { airDrop, airToken, deployer, clientAddress};
    }


describe('ceate Airdrop', function () {

    it("should be the right name", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airDrop, airToken, clientAddress } = await loadFixture(deployAirdropContractSet);
        
       
        const name = await airToken.name();
        console.log("name : ", name);
        const client = await clientAddress.address;
        console.log("client :", client);

        // const balance = await airToken.balance;
        // console.log("balance : ", balance);

        const balance = await airDrop.getBalance(airToken.address);
        console.log("balance : ", balance);
        

        const clientList = await clientAddress.getClientAddress();
        for (let i =0; i < clientList.length; i++){
            console.log("clientList : ", clientList[i]);
        }
        
        const count = await clientAddress.getCount();
        console.log("count : ", count);

        

       
        const clientList2 = await airDrop.getClientList();
        for (let i =0; i < clientList2.length; i++){
            console.log("clientListFromAirdop : ", clientList2[i]);
         
        }

        const result = await airToken._transfer(airToken.address,clientList2[2], 10)
        console.log("result : ", result);
        console.log("clientList2[2] : ", clientList2[2]);
        

    });

    
})

})