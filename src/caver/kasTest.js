const config = require('../../config.js');
const CaverExtKAS = require('caver-js-ext-kas');
const fs = require('fs');

const writeJSON = async (result) => {
  const data = JSON.stringify(result);

  fs.writeFile(`./data/holders.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log('holders.json data is saved.');
  });
};

const test = async () => {
  const caver = new CaverExtKAS();
  caver.initKASAPI(8217, config.ACCESSKEY, config.SECRET_ACCESSKEY);

  const query = {
    status: caver.kas.tokenHistory.queryOptions.status.COMPLETED,
    size: 1000,
    type: caver.kas.tokenHistory.queryOptions.type.ERC20,
  };

  await caver.kas.tokenHistory
    .getFTContractList(query)
    .createAccount()
    .then((res) => {
      writeJSON(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = test;
