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


describe('should do airdrop to 10 clientAddresses', function () {

    it("check the Address of clientAddress's Contract", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airDrop, airToken, clientAddress } = await loadFixture(deployAirdropContractSet);
    
        const clientAddressCA = await clientAddress.address;
        console.log("clientAddressCA :", clientAddressCA);

    });
  


     it("check the balance of airToken", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airDrop, airToken, clientAddress } = await loadFixture(deployAirdropContractSet);
        
        // if blance is correct, airDrop and airToken is connected well 
        const balance = await airDrop.getBalance(airToken.address);
        console.log("balance : ", balance);        

    });    
      
       
        
    it("check the clientList from clientAddress's Contract", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airDrop, airToken, clientAddress } = await loadFixture(deployAirdropContractSet);
        
        const clientList = await clientAddress.getClientAddress();
        for (let i =0; i < clientList.length; i++){
            console.log("clientList : ", clientList[i]);
        }
    });
        
        

       
        // const balance2 = await airDrop.getBalance(clientList[3]);
        // console.log("balance2 : " , balance2);
        // const count = await clientAddress.getCount();
        // console.log("count : ", count);

        
    it("check the clientLit from airDrop's Contract", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airDrop, airToken, clientAddress } = await loadFixture(deployAirdropContractSet);
        
        const clientList2 = await airDrop.getClientAddress();
        for (let i =0; i < clientList2.length; i++){
            console.log("clientListFromAirdop : ", clientList2[i]);
            const balances = await airDrop.getBalance(clientList2[i]);
            console.log("balances : ", balances)
         
        }

    });
       
        

        // const result = await airToken.transfer(clientList2[3], 777)
        // console.log("result : ", result);
        // console.log("clientList2[3] : ", clientList2[3]);
        
        // const balance3 = await airDrop.getBalance(clientList[3]);
        // console.log("balance3 : " , balance3);

        
     it("do airDrop and check the balance after airdrop", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airDrop, airToken, clientAddress } = await loadFixture(deployAirdropContractSet);
        
        await airDrop.doAirDrop(15);
        const clientList2 = await airDrop.getClientAddress();
        for (let i =0; i < clientList2.length; i++){
            console.log("clientListFromAirdop : ", clientList2[i]);
            const balances = await airDrop.getBalance(clientList2[i]);
            console.log("balances : ", balances)
         
        }
    });  
         
       
    it("check the balance of airToken's Contract after airdrop", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airDrop, airToken, clientAddress } = await loadFixture(deployAirdropContractSet);
        
        const balance0 = await airDrop.getBalance(airToken.address);
        console.log("balance : ", balance0);


    });
        
       
   

    
})

})