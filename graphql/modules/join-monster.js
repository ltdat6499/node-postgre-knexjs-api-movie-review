const joinMonster = require("join-monster").default;
const db = require("../../configs/database-connect");
const option = { dialect: "pg" };

module.exports = (parent, args, ctx, resolveInfo) =>
  joinMonster(
    resolveInfo,
    ctx,
    async (sql) => {
      return await db.raw(sql);
    },
    option
  );