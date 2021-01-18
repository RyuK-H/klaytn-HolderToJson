const fs = require('fs');
const config = require('../../config.js');
const Caver = require('caver-js');
const caver = new Caver(config.rpcURL);
const holder = require(`../../data/balance_holders.json`);

const writeBalanceJSON = async (list, index) => {
  const data = JSON.stringify(list);

  fs.writeFile(`./data/balance/${index}_balance.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log('balance_holders.json data is saved.');
  });
};

const divisionHolders = async () => {
  let userList = [];

  holder.forEach((data, index) => {
    userList.push(data);
    if (index % 200 === 0 && index > 0) {
      writeBalanceJSON(userList, index / 200);
      userList = [];
    }

    if (index === holder.length - 1) {
      writeBalanceJSON(userList, 349);
    }
  });
};

module.exports = divisionHolders;
