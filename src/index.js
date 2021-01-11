const getHolders = require('./caver/getHolders');
const kasTest = require('./caver/kasTest');
const integrated = require('./caver/deduplication');
const getUsersInfo = require('./caver/getBalance');
const result = require('../data/balance_holders.json');

// getHolders();
// kasTest();
// integrated();
//getUsersInfo();

console.log(result.length)