const { expect } = require('chai');
const { ethers } = require('hardhat')

describe('RealEstate', () => {
  let realEstate, escrow
  let deployer, seller, buyer
  let nftID = 1

  beforeEach(async () => {
    // Setup accounts
    accounts = await ethers.getSigners()
    deployer = accounts[0]
    seller = deployer
    buyer = accounts[1]

    // Load contracts
    const RealEstate = await ethers.getContractFactory('RealEstate')
    const Escrow = await ethers.getContractFactory('Escrow')

    // Deploy contracts
    realEstate = await RealEstate.deploy()
    escrow = await Escrow.deploy(
      realEstate.address,
      nftID,
      seller.address,
      buyer.address,
    )

    // Seller Approves NFT to be transfered to the escrow contract
    await realEstate.connect(seller).setApprovalForAll(escrow.address, true)
  })

  describe('Deployment',  async() => {
    it('seller has an NFT', async () => {
      // Expect the seller to be the owner of the token
      expect(await realEstate.ownerOf(nftID)).to.equal(deployer.address)
    });
  })
  
  describe('Selling the NFT', () => {
    it('successfully transfers token from seller to buyer after finalizing', async () => {
      // Seller is the owner before the sale
      expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)

      // Buyer Finalize sale
      await escrow.connect(buyer).finalizeSale()
      console.log('🍕 Buyer finalizes the sale')

      // Expect the new owner of the token to be the buyer
      expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address);
    });
  })

})