const getHolders = require('./caver/getHolders');
const kasTest = require('./caver/kasTest');
const integrated = require('./caver/deduplication');
const getUsersInfo = require('./caver/getBalance');
const verifySnapShot = require('./caver/verifySnapShot');
const holderList = require('../data/1_11_holders.json');
const result = require('../data/balance_holders.json');

// getHolders();
// kasTest();
// integrated();
// getUsersInfo();
verifySnapShot();
