const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index; // Block number in the chain
    this.timestamp = timestamp; // Time of creation
    this.data = data; // Transaction data
    this.previousHash = previousHash; // Hash of the previous block
    this.hash = this.calculateHash(); // Hash of the current block
  }

  // Fake/simple hash function using SHA256 for demonstration
  calculateHash() {
    const toHash = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

// Blockchain class to manage the chain of blocks
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]; 
  }

  // Creates the Genesis block (first block in the chain)
  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), 'Genesis Block', '0');
  }

  // Get the latest block in the chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Adds a new block with given data
  addBlock(newData) {
    const prevBlock = this.getLatestBlock();
    const newBlock = new Block(
      prevBlock.index + 1, // Increment index
      new Date().toISOString(), // Current time
      newData, // Transaction/message
      prevBlock.hash // Link to previous block
    );
    this.chain.push(newBlock); // Add new block to the chain
  }

  // Checks for chain integrity (tampering detection)
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];

      if (curr.hash !== curr.calculateHash()) {
        return false;
      }

      if (curr.previousHash !== prev.hash) {
        return false;
      }
    }
    return true;
  }

  // Prints the entire blockchain
  printChain() {
    console.log(JSON.stringify(this.chain, null, 2));
  }
}
