const config = require('../../config.js');
const Caver = require('caver-js');
const caver = new Caver(config.rpcURL);
const HOLDER_GROUP = 354;

const verifySnapShot = async () => {
  let totalAmount = 0;
  let totalUser = 0;

  // for (let i = 0; i <= HOLDER_GROUP; i++) {
  //   const holderGroup = await require(`../../data/balance/${i}_balance.json`);
  //   totalUser += holderGroup.length;

  //   console.log(`${i} Page User Count : ${holderGroup.length}`);

  //   holderGroup.forEach((data) => {
  //     if (data.balance === 0) {
  //       console.log('?');
  //     }

  //     if (data.address.match(/0x6a538e3f884f396586f8876424c320424a11df59/i)) {
  //       console.log(data.balance);
  //     }

  //     const BNBalance = caver.utils.toBN(data.balance);
  //     totalAmount = caver.utils.toBN(totalAmount).add(BNBalance).toString();
  //   });
  // }

  // console.log(`Big Number Total : ${totalAmount}`);
  // console.log(`Total : ${caver.utils.convertFromPeb(totalAmount, 'KLAY')}`);
  // console.log(`Total User : ${totalUser}`);

  const holder = await require(`../../data/balance_holders.json`);

  holder.forEach((data) => {
    const BNBalance = caver.utils.toBN(data.balance);
    totalAmount = caver.utils.toBN(totalAmount).add(BNBalance).toString();
  });

  console.log(`Big Number Total : ${totalAmount}`);
  console.log(`Total : ${caver.utils.convertFromPeb(totalAmount, 'KLAY')}`);
  console.log(`Total User : ${holder.length}`);
};

module.exports = verifySnapShot;
