const db = require("../configs/database-connect");

exports.getLastOfTable = async (table) => {
  return await db(table)
    .select()
    .orderBy("id", "desc")
    .first();
};

exports.countItemBeforeId = async (table, id) => {
  return await db(table)
    .select()
    .count("*")
    .whereRaw(`id < ?`, id);
};
