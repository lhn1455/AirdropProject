const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");


describe('Airdrop', function() {
     async function deployAirdrop() {
        const [ deployer, client1, client2, client3 ] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);
        console.log("client1 address", client1.address)
        console.log("client2 address", client2.address)
        console.log("client3 address", client3.address)
        

        const Airdrop = await hre.ethers.getContractFactory("Airdrop");
        const AirToken = await hre.ethers.getContractFactory("AirToken");
        const airdrop = await Airdrop.deploy();
        const airToken = await AirToken.deploy();

        return { airdrop, airToken, deployer, client1, client2, client3 };
    }


describe('ceate Airdrop', function () {

    it("should be the right name", async function() {
        const { airdrop } = await loadFixture(deployAirdrop);
        const name = await airToken.name();
        console.log("name : ", name);

    });

    it("should be the right symbol", async function() {
        const { airdrop } = await loadFixture(deployAirdrop);
        const symbol = await airToken.symbol();
        console.log("symbol : ", symbol);

    });

    it("should be the right totalSupply", async function() {
        const { airdrop } = await loadFixture(deployAirdrop);
        const totalSupply = await airToken.totalSupply();
        console.log("totalSupply : ", totalSupply);

    });

    it("should be the right address", async function() {
        const { airdrop } = await loadFixture(deployAirdrop);
        const address  = await airToken.address;
        console.log("address : ", address);

    });
})

})