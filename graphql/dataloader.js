const DataLoader = require("dataloader");
const db = require("../configs/database-connect");

const mapIds = (ids, res) => {
  const m = res.reduce((arr, item) => {
    arr[item.id] = item;
    return arr;
  }, {});
  return ids.map((id) => m[id] || null);
};

const getLoaders = (table) => ({
  loader: new DataLoader(async (list) => {
    return await list.map(async (ids) => {
      const res = await db(table).whereRaw(`id = ANY(?)`, [ids]);
      return mapIds(ids, res);
    });
  }),
});

module.exports = getLoaders;
