const db = require("../configs/database-connect");
const dataloader = require("./dataloader");

exports.loadOneRow = async (table, id) => {
  const [res] = await dataloader(table).loader.load([id]);
  return res;
};

exports.loadManyRowByParentId = async (table, parentId, conditionColumn) => {
  const rs = await db(table).select("id").where(conditionColumn, parentId);
  const ids = rs.map((item) => item.id);
  return await dataloader(table).loader.load(ids);
};
