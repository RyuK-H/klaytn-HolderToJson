const fs = require('fs');

const HOLDER_GROUP = 11;

const writeJSON = async (num, result) => {
  const data = JSON.stringify(result);

  await fs.writeFile(`./data/${1}_${num}_holders.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log('holders.json data is saved.');
  });
};

const getHolders = async () => {
  let holderData_1;
  let totalHolder = 0;

  for (let i = 2; i <= HOLDER_GROUP; i++) {
    let holderData_2;

    if (i === 2) {
      holderData_1 = await require(`../../data/${i - 1}_holders.json`);
      holderData_2 = await require(`../../data/${i}_holders.json`);
    } else {
      holderData_2 = await require(`../../data/${i}_holders.json`);
    }

    const newArr = holderData_1.concat(holderData_2);
    const result = newArr.filter(function (a, i, self) {
      return self.indexOf(a) === i;
    });

    holderData_1 = result;

    console.log(`${i - 1}-${i}번째 데이터 통합`);

    await writeJSON(i, result);
  }
};

module.exports = getHolders;
