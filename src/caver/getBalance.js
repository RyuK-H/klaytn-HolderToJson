const fs = require('fs');
const Caver = require('caver-js');
const config = require('../../config.js');
const caver = new Caver(config.rpcURL);
const contractInstance = new caver.klay.Contract(SIT_CONTRACT.abi, SIT_CONTRACT.address);
const holders = require('../../data/1_10_holders.json');

let result = [];
let errorList = [];
let emptyList = [];

const writeJSON = async (result) => {
    const data = JSON.stringify(result);
  
    fs.writeFile(`./data/balance_holders.json`, data, (err) => {
      if (err) {
        throw err;
      }
      console.log('balance_holders.json data is saved.');
    });
};

const getBalance = async (address) => {
    let userInfo;
    const balance = await contractInstance.methods.balanceOf(address).call();
    userInfo = {
        address,
        balance
    }

    return userInfo;
}

const getUsersInfo = async () => {
    let totalAmount = 0;

    for(let i = 0; i < holders.length; i++) {
        const userInfo = await getBalance(holders[i])
        .then((data)=> {
            console.log(data);
            return data;
          })
          .catch((error) => {
            console.log(`${i}번째 에러`, error);
            errorList.push(i);
            writeJSON(result);
          });

        if(userInfo.balance === '0') {
            emptyList.push(userInfo.address);
            console.log(`${i} 유저 잔액 없음`);
        } else {
            const BNBalance = caver.utils.toBN(userInfo.balance)
            totalAmount = caver.utils.toBN(totalAmount).add(BNBalance).toString();
    
            result.push(userInfo);
        }

        if(i % 100 === 0) {
            console.log(`${i} 완료`);
        }
    }

    await writeJSON(result);

    console.log("Total Holders", result.length)
    console.log("Total Amounts", caver.utils.convertFromPeb(totalAmount, 'KLAY'));
    console.log("Error List", errorList)
    console.log("Empty List", emptyList)
  };
  
  module.exports = getUsersInfo;