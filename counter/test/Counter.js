const { expect } = require('chai');
const { ethers } = require('hardhat');


describe('Counter', () => {
  let counter

  beforeEach(async() => {
    const Counter = await ethers.getContractFactory('Counter'); // After compiling will store in artifacts
    counter = await Counter.deploy("First name", 123); // deployed instance of a contract.
  });

  describe('Deployment', () => {
    it('sets the initial count and name', async () => {
      // Check the count is what we expect
      const initCount = await counter.count();
      const initName = await counter.name();
      expect(initCount).to.equal(123);
      expect(initName).to.equal("First name");
    });
  });

  describe('Manipulating variables', async () => {
    it('can update variables after initialization', async () => {
      // update counter
      await counter.decrement();
      expect(await counter.count()).to.equal(122)
      await counter.increment();
      expect(await counter.count()).to.equal(123)
      
      // update name
      await counter.setName('niceee');
      expect(await counter.name()).to.equal('niceee')
    });
  });
})