const { expect } = require("chai");
const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const hre = require("hardhat");


describe('AirToken', function() {
     async function deployAirToken() {
         const [owner, otherAccount] = await hre.ethers.getSigners();

        const AirToken = await hre.ethers.getContractFactory("AirToken");
        const airToken = await AirToken.deploy();

        return { airToken, owner, otherAccount };
    }


describe('ceate AirToken', function () {

    it("should be the right name", async function() {
        const { airToken } = await loadFixture(deployAirToken);
        const name = await airToken.name();
        console.log("name : ", name);

    });

    it("should be the right symbol", async function() {
        const { airToken } = await loadFixture(deployAirToken);
        const symbol = await airToken.symbol();
        console.log("symbol : ", symbol);

    });

    it("should be the right totalSupply", async function() {
        const { airToken } = await loadFixture(deployAirToken);
        const totalSupply = await airToken.totalSupply();
        console.log("totalSupply : ", totalSupply);

    });

    it("should be the right address", async function() {
        const { airToken } = await loadFixture(deployAirToken);
        const address  = await airToken.address;
        console.log("address : ", address);

    });
})

})