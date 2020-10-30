const DataLoader = require("dataloader");
const db = require("../configs/database-connect");

const getLoaders = (table) => ({
  loader: new DataLoader(async (list) => {
    return await list.map(async (ids) => {
      return await db(table).whereRaw(`id = ANY(?)`, [ids]);
    });
  }),
});

module.exports = getLoaders;
