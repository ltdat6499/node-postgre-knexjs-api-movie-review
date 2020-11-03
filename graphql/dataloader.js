const DataLoader = require("dataloader");
const db = require("../configs/database-connect");

const getLoaders = (table) => ({
  loader: new DataLoader(async (list) => {
    return await list.map(async (ids) => {
      const res = await db(table).whereRaw(`id = ANY(?)`, [ids]);
      let result = [];
      for (let i = 0; i < ids.length; i++) {
        result[i] = res.find((x) => x.id === ids[i]);
      }
      return result;
    });
  }),
});

module.exports = getLoaders;
