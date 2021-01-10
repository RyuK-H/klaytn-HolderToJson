const SIT_CONTRACT = require('../constants/SIT_ABI');
const rpcURL = require('../../config.js');
const Caver = require('caver-js');

const caver = new Caver(rpcURL);
const contractInstance = new caver.klay.Contract(SIT_CONTRACT.abi, SIT_CONTRACT.address);
const fromBlock = '0x0';
const toBlock = 'latest';

function getHoldersAddress() {
  const option = {
    fromBlock,
    toBlock,
    address: SIT_CONTRACT.address,
  };

  // caver.rpc.klay.getAccount(SIT_CONTRACT.address);
  // console.log(caver.rpc.klay.getBlockNumber());
  // rpcInstance.getLogs({
  //   fromBlock: '0x1',
  //   toBlock: 'latest',
  //   address: '0x87ac99835e67168d4f9a40580f8f5c33550ba88b',
  // });

  // console.log(caver.rpc.klay.getLogs({ option }));
  contractInstance.getPastEvents('Transfer', option, function (error, events) {
    if (events) {
      // events map으로 돌면서 to address list 획득
      // 획득한 address들의 balance 확인
      // balance가 0이 아닌 주소들이 토큰 보유자
      console.log(events);
    }
  });
}

module.exports = getHoldersAddress;
