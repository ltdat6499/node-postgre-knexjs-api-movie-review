const joinMonster = require("join-monster").default;
const db = require("../configs/database-connect");
const isPass = require("../middleware/passport");
const option = { dialect: "pg" };

const jm = (parent, args, ctx, resolveInfo) =>
  joinMonster(resolveInfo, ctx, async (sql) => await db.raw(sql), option);

module.exports = async (parent, args, ctx, resolveInfo, role) => {
  if (await isPass(ctx, role)) return jm(parent, args, ctx, resolveInfo);
};
