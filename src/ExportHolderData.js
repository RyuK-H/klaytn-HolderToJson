const fs = require('fs');
const rpcURL = require('../config.js');
const Caver = require('caver-js');
const caver = new Caver(rpcURL);

const HOLDER_GROUP = 63;

const writeJSON = async () => {
  let totalAmount = 0;
  let totalHolder = 0;

  for (let i = 1; i <= HOLDER_GROUP; i++) {
    const holder = require(`../data/${i}_Group_holder.json`);

    totalHolder += holder.length;

    for (let j = 0; j < holder.length; j++) {
      const Big = caver.utils.toBN(holder[j].hexToNumberString);
      totalAmount = caver.utils.toBN(totalAmount).add(Big).toString();
    }
  }

  const info = JSON.stringify({
    totalSupply: caver.utils.convertFromPeb(totalAmount, 'KLAY'),
    holderCount: totalHolder,
  });

  fs.writeFile('info.json', info, (err) => {
    if (err) {
      throw err;
    }
    console.log('info.json data is saved.');
  });
};

writeJSON();
