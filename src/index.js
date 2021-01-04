const axios = require('axios');
const fs = require('fs');
let holdersData;
const MAX_PAGE = 1;

const getHolders = async (page) => {
  try {
    return await axios.get(`https://api-cypress.scope.klaytn.com/v1/tokens/0x5288f80f4145035866ac4cb45a4d8dea889ec827/holders?page=${page}`);
  } catch (error) {
    console.error(error);
  }
};

const holdersToJSON = async (page) => {
  const holders = await getHolders(page);

  if (holders.data) {
    console.log(holders.data.result);
  }
};

const loopGETHolder = async () => {
  for(let i = 1; i <= MAX_PAGE; i++) {
    await holdersToJSON(i);
  }
  
  console.log("Write JSON");
  // await writeJSON();
}

const writeJSON = async () => {
  const data = JSON.stringify(holdersData);

  fs.writeFile('holder.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
  });
}

loopGETHolder();