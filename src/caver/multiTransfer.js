const Caver = require('caver-js');
const BOX_CONTRACT = require('../constants/BOX_ABI');
const config = require('../../config.js');
const caver = new Caver(config.rpcURL);
const contractInstance = new caver.klay.Contract(BOX_CONTRACT.abi, BOX_CONTRACT.address);
const senderPrivateKey = config.PRKEY;
const wallet = caver.klay.accounts.wallet.add(senderPrivateKey);
const MAX_GROUP = 354;

const transfer = async (addressList, balanceList) => {
  const encodedAbi = await contractInstance.methods.MultiTransfer(addressList, balanceList).encodeABI();

  await caver.klay
    .sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: wallet.address,
      to: BOX_CONTRACT.address,
      data: encodedAbi,
      gas: 10000000,
      value: 0,
    })
    .then((data) => {
      console.log(`TX : ${data.transactionHash}`);
    });
};

const multiTransfer = async () => {
  for (let i = 318; i <= MAX_GROUP; i++) {
    const holdersData = await require(`../../data/balance/${i}_balance.json`);
    let addressList = [];
    let balanceList = [];
    let totalAmount = 0;

    holdersData.forEach((data) => {
      addressList.push(data.address);
      balanceList.push(data.balance);

      const BNBalance = caver.utils.toBN(data.balance);
      totalAmount = caver.utils.toBN(totalAmount).add(BNBalance).toString();
    });

    await transfer(addressList, balanceList);
    console.log(`${i}번째 완료`);
    console.log(`${addressList.length}에게 총 ${caver.utils.convertFromPeb(totalAmount, 'KLAY')} 전송`);
  }
};

module.exports = multiTransfer;
