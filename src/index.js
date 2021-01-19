const fs = require('fs');
const caverHolders = require('../data/result/caver_holders.json');
const scopeHolders = require('../data/result/scope_holders.json');

const result = [];

const writeJSON = async () => {
  const data = JSON.stringify(result);

  fs.writeFile(`./data/result/missing_holders.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log('missing_holders.json data is saved.');
  });
};

for (let i = 0; i < caverHolders.length; i++) {
  console.log(`${i}번째 진입`);
  for (let j = 0; j < scopeHolders.length; j++) {
    if (caverHolders[i].address.match(new RegExp(scopeHolders[j].address, 'i'))) {
      console.log(`${j}번째 탈출`);
      break;
    } else if (j === scopeHolders.length - 1) {
      console.log(caverHolders[i].address);
      result.push(caverHolders[i].address);
    }
  }
}
writeJSON();
