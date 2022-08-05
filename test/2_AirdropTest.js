const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");


describe('Airdrop', function() {
     async function deployAirdrop() {
        const [ deployer, client1, client2, client3 ] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);
        console.log("client1 address", client1.address)
        console.log("client2 address", client2.address)
        console.log("client3 address", client3.address)
        

        const Airdrop = await hre.ethers.getContractFactory("AirDrop");
        const AirToken = await hre.ethers.getContractFactory("AirToken");
    
        const airToken = await AirToken.deploy();
        const airdrop = await Airdrop.deploy(airToken.address);

        return { airdrop, airToken, deployer, client1, client2, client3 };
    }


describe('ceate Airdrop', function () {

    it("should be the right name", async function() {
        const { airdrop, airToken } = await loadFixture(deployAirdrop);
        
        const name = await airToken.name();
        console.log("name : ", name);
        const address = await airdrop.getAddress();
        console.log("address :", address);

    });

    
})

})