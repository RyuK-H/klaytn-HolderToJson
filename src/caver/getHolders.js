const Caver = require('caver-js');
const fs = require('fs');
const SIT_CONTRACT = require('../constants/SIT_ABI');
const config = require('../../config.js');

const caver = new Caver(config.rpcURL);
const contractInstance = new caver.klay.Contract(SIT_CONTRACT.abi, SIT_CONTRACT.address);

const writeJSON = async (result) => {
  const data = JSON.stringify(result);

  fs.writeFile(`./data/holders.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log('holders.json data is saved.');
  });
};

const getHoldersAddress = async () => {
  let holders = [];
  let result = [];

  for (let i = 0; i < 487; i++) {
    const option = {
      fromBlock: 100000 * i, // 한 블록씩 중복이 생기지만, 상관 없으니 걍 고고 // 48637987
      toBlock: i === 486 ? 'latest' : 100000 * (i + 1),
    };

    console.log(`${option.fromBlock} ~ ${option.toBlock} 진입`);

    await contractInstance.getPastEvents('Transfer', option).then((dataArray) => {
      console.log(`${i}번째 ${dataArray.length}개의 데이터 확보`);
      dataArray.map((data) => {
        holders.push(data.returnValues.to);
      });
    });

    if (i !== 0) {
      console.log(`${i}번째 중복 제거 작업 중`);
      holders = holders.filter(function (a, i, self) {
        return self.indexOf(a) === i;
      });
    }

    console.log(`${i} 완료`);
  }

  console.log('Processing Deduplication');

  await writeJSON(result);
};

module.exports = getHoldersAddress;
