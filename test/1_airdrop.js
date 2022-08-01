const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");


describe('Token', function(accounts) {
    it("should set the rignt name"), async function () {
        const Token = await hre.ethers.getContractFactory("Token");
        const token = await Token.deploy(100);

        const name = await token.getName();
        console.log("name : ", name)


    }
})