const db = require("../configs/database-connect");

const getLastOfTable = async (table) => {
  return await db(table)
    .select()
    .orderBy("id", "desc")
    .first();
};

const countItemBeforeId = async (table, id) => {
  return await db(table)
    .select()
    .count("*")
    .whereRaw(`id < ?`, id);
};

module.exports = {
  getLastOfTable,
  countItemBeforeId,
};
