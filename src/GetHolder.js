const axios = require('axios');
const fs = require('fs');
const rpcURL = require('../config.js');
const Caver = require('caver-js');
const caver = new Caver(rpcURL);

let holdersData = [];
const MAX_PAGE = 3144;
const PAGE_GROUP = 50;
let CUR_PAGE_GROUP = 1;

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

      holdersData.push(temp);
    }
  }
};

const loopGETHolder = async () => {
  for (let i = 1; i <= MAX_PAGE; i++) {
    console.log(`${i} 페이지 진입`);
    await holdersToJSON(i);

    if (i % PAGE_GROUP === 0 || i === MAX_PAGE) {
      console.log(`${CUR_PAGE_GROUP} 번째 그룹 저장 중`);
      await writeJSON(CUR_PAGE_GROUP);
      CUR_PAGE_GROUP++;
      holdersData = [];
    }
  }
};

const writeJSON = async (num) => {
  const data = JSON.stringify(holdersData);

  fs.writeFile(`./data/${num}_Group_holder.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log('holder.json data is saved.');
  });
};

loopGETHolder();
