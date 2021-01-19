const getHolders = require('./caver/getHolders');
const integrated = require('./caver/deduplication');
const getUsersInfo = require('./caver/getBalance');
const divisionHolders = require('./caver/divisionHolders');
const verifySnapShot = require('./caver/verifySnapShot');
const multiTransfer = require('./caver/multiTransfer');
const caverHolders = require('./data/balance_holders.json');

// getHolders();
// integrated();
// getUsersInfo();
// divisionHolders();
// verifySnapShot();
// multiTransfer();

console.log(caverHolders.length);
