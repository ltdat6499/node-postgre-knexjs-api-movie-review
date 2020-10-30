const dbAction = require("./db-action");

exports.hasNextPage = async (table, id) => {
  const lastRow = await dbAction.getLastOfTable(table);
  const lastId = lastRow.id;
  if (lastId > id) return true;
  return false;
};

exports.hasPreviousPage = async (table, id, range) => {
  const [{ count }] = await dbAction.countItemBeforeId(table, id);
  if (count >= range) return true;
  return false;
};
