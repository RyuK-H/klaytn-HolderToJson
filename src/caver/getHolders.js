const SIT_CONTRACT = require('../constants/SIT_ABI');
const config = require('../../config.js');
const Caver = require('caver-js');

const caver = new Caver(config.rpcURL);
const contractInstance = new caver.klay.Contract(SIT_CONTRACT.abi, SIT_CONTRACT.address);

const getHoldersAddress = async () => {
  const option = {
    fromBlock: 48632272,
    toBlock: 48632505,
  };

  await contractInstance.getPastEvents('Transfer', option).then(function (events) {
    console.log(events); // same results as the optional callback above
  });
};

module.exports = getHoldersAddress;
