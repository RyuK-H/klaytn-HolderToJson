const config = require('../../config.js');
const CaverExtKAS = require('caver-js-ext-kas');

const test = async () => {
  const caver = new CaverExtKAS();
  caver.initKASAPI(8217, config.ACCESSKEY, config.SECRET_ACCESSKEY);

  console.log(config.ACCESSKEY);
  console.log(config.SECRET_ACCESSKEY);

  await caver.kas.wallet
    .createAccount()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = test;
