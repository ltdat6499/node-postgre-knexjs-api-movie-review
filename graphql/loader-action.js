const db = require("../configs/database-connect");
const dataloader = require("./dataloader");

const loadOneRow = async (table, id) => {
  const [res] = await dataloader(table).loader.load([id]);
  return res;
};

const loadManyRowByParentId = async (table, parentId, column) => {
  let ids = await db(table)
    .select("id")
    .where(column, parentId);
  ids = Object.keys(ids).map((key) => ids[key].id);
  const res = await dataloader(table).loader.load(ids);
  return res;
};

module.exports = {
  loadOneRow,
  loadManyRowByParentId,
};
