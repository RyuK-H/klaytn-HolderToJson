const getHolders = require('./caver/getHolders');
const integrated = require('./caver/deduplication');
const getUsersInfo = require('./caver/getBalance');
const divisionHolders = require('./caver/divisionHolders');
const verifySnapShot = require('./caver/verifySnapShot');
const multiTransfer = require('./caver/multiTransfer');

// getHolders();
// integrated();
// getUsersInfo();
// divisionHolders();
verifySnapShot();
// multiTransfer();
