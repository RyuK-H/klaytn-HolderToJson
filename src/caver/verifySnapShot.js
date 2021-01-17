const config = require('../../config.js');
const Caver = require('caver-js');
const caver = new Caver(config.rpcURL);
const HOLDER_GROUP = 354;

const verifySnapShot = async () => {
  let totalAmount = 0;
  let totalUser = 0;

  for (let i = 0; i <= HOLDER_GROUP; i++) {
    const holderGroup = await require(`../../data/balance/${i}_balance.json`);
    totalUser += holderGroup.length;

    holderGroup.forEach((data) => {
      if (data.balance === 0) {
        console.log('?');
      }
      const BNBalance = caver.utils.toBN(data.balance);
      totalAmount = caver.utils.toBN(totalAmount).add(BNBalance).toString();
    });
  }
  console.log(`Big Number Total : ${totalAmount}`);
  console.log(`Total : ${caver.utils.convertFromPeb(totalAmount, 'KLAY')}`);
  console.log(`Total User : ${totalUser}`);
};

module.exports = verifySnapShot;
