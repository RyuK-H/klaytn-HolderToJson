const fs = require('fs');
const Caver = require('caver-js');
const config = require('../../config.js');
const caver = new Caver(config.rpcURL);
const contractInstance = new caver.klay.Contract(SIT_CONTRACT.abi, SIT_CONTRACT.address);

const transfer = async (addressList, balanceList) => {
  const encodedAbi = await contractInstance.methods.multiTransfer(addressList, balanceList);
};

const multiTransfer = async (address) => {
  const holdersData = await require(`../../data/balance/1_balance.json`);
  let addressList;
  let balanceList;
  let totalAmount = 0;

  holdersData.forEach((data) => {
    addressList.push(data.address);
    balanceList.push(data.balance);

    const BNBalance = caver.utils.toBN(data.balance);
    totalAmount = caver.utils.toBN(totalAmount).add(BNBalance).toString();
  });

  console.log(`${addressList.length}에게 총 ${totalAmount} 전송`);
  await transfer(addressList, balanceList);
};

module.exports = multiTransfer;
