const axios = require('axios');
const fs = require('fs');
const rpcURL = require('../config.js');
const Caver = require('caver-js');
const caver = new Caver(rpcURL);

let holdersData = [];
let holderCount = 0;
let totalAmount = 0;
const MAX_PAGE = 1;

const getHolders = async (page) => {
  try {
    return await axios.get(
      `https://api-cypress.scope.klaytn.com/v1/tokens/0x5288f80f4145035866ac4cb45a4d8dea889ec827/holders?page=${page}`,
    );
  } catch (error) {
    console.error(error);
  }
};

const holdersToJSON = async (page) => {
  const holders = await getHolders(page);

  if (holders.data) {
    for (let i = 0; i < holders.data.result.length; i++) {
      const hexToNumberString = caver.utils.hexToNumberString(holders.data.result[i].amountHeld);
      const temp = {
        address: holders.data.result[i].address,
        amount: holders.data.result[i].amountHeld,
        hexToNumberString: hexToNumberString,
        convertFromPeb: caver.utils.convertFromPeb(hexToNumberString, 'KLAY'),
      };
      const Big = caver.utils.toBN(hexToNumberString);
      totalAmount = caver.utils.toBN(totalAmount).add(Big).toString();
      holderCount++;

      holdersData.push(temp);
    }
  }
};

const loopGETHolder = async () => {
  for (let i = 1; i <= MAX_PAGE; i++) {
    console.log(`${i} 페이지 진입`);
    await holdersToJSON(i);
  }

  await writeJSON();
};

const writeJSON = async () => {
  const data = JSON.stringify(holdersData);

  fs.writeFile('holder.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('holder.json data is saved.');
  });

  const info = JSON.stringify({
    totalSupply: caver.utils.convertFromPeb(totalAmount, 'KLAY'),
    holderCount: holderCount,
  });

  fs.writeFile('info.json', info, (err) => {
    if (err) {
      throw err;
    }
    console.log('info.json data is saved.');
  });
};

loopGETHolder();
