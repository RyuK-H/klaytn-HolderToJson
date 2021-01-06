const Caver = require('caver-js');
const caver = new Caver();
const Config = require('../config.js');

const CONTRACT_ADDRESS = Config.TOKENADDRESS;
const PRIVATE_KEY = Config.PRKEY;
const SIG = caver.klay.accounts.sign(CONTRACT_ADDRESS, PRIVATE_KEY)

console.log(SIG)