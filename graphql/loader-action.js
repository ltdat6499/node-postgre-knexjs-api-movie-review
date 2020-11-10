const db = require("../configs/database-connect");
const dataloader = require("./dataloader");

exports.loadOneRow = async (table, id) => {
     const [res] = await dataloader(table).loader.load([id]);
     return res;
};

exports.loadManyRowByParentId = async (table, parentId, conditionColumn) => {
     let idList = await db(table)
          .select("id")
          .where(conditionColumn, parentId);
     idList = Object.keys(idList).map((key) => idList[key].id);
     const res = await dataloader(table).loader.load(idList);
     return res;
};
