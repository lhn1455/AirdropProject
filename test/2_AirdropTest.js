const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");


describe('Airdrop', function() {
     async function deployAirdropContractSet() {
        const [ deployer ] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);
        
        const AirToken = await hre.ethers.getContractFactory("AirToken");
        const Airdrop = await hre.ethers.getContractFactory("AirDrop");
        const Address = await hre.ethers.getContractFactory("Address");
        
        
    
        const airToken = await AirToken.deploy();
        const address = await Address.deploy();
        const airdrop = await Airdrop.deploy(airToken.address);

        return { airdrop, airToken, deployer, address};
    }


describe('ceate Airdrop', function () {

    it("should be the right name", async function() {
        const [ deployer ] = await ethers.getSigners();
        const { airdrop, airToken, address } = await loadFixture(deployAirdropContractSet);
        
       
        const name = await airToken.name();
        console.log("name : ", name);
        const airdropContract = await airdrop.getAddress();


        const balance = await web3.eth.getBalance(airdropContract);
        console.log("value : " ,  balance);


        console.log("airdropContract :", airdropContract);

        const add = await address.getContractAddress();
        console.log("ClientAddress : " ,  add);
        

    });

    
})

})