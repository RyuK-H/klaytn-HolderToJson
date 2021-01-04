const holder = require('../holder.json');
const rpcURL = require('../config.js');
const Caver = require('caver-js');
const caver = new Caver(rpcURL);

let totalAmount = 0;

console.log(holder.length);

for (let i = 0; i < holder.length; i++) {
  const Big = caver.utils.toBN(holder[i].hexToNumberString);
  totalAmount = caver.utils.toBN(totalAmount).add(Big).toString();
}

console.log(caver.utils.convertFromPeb(totalAmount, 'KLAY'));
