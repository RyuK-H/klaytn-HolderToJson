const getHolders = require('./caver/getHolders');
const integrated = require('./caver/deduplication');
const getUsersInfo = require('./caver/getBalance');
const verifySnapShot = require('./caver/verifySnapShot');
const multiTransfer = require('./caver/multiTransfer');
const holderList = require('../data/1_11_holders.json');
const result = require('../data/balance_holders.json');

// getHolders();
// integrated();
// getUsersInfo();
verifySnapShot();
// multiTransfer();
