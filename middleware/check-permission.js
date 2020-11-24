const jwtToken = require("jsonwebtoken");
const db = require("../configs/database-connect");
const config = require("../configs/config");

module.exports = async (ctx, permission, next) => {
  const typeOfAuth = await typeof ctx.headers.authorization;
  const auth = await ctx.headers.authorization;
  if (typeOfAuth == "undefined") {
    ctx.response.status = 401;
    ctx.throw("Hack?");
  }

  const token = auth.split(" ")[1];
  const payload = jwtToken.verify(token, config.jwtKey.admin);
  const id = payload.id;

  const roles = await db("roles")
    .select("role")
    .where("user_id", id + "");

  for (const iterator of roles) {
    if (iterator.role == permission) return await next();
  }

  ctx.response.status = 403;
  ctx.throw("U dont have permission to read author");
};
