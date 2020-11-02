const jwtToken = require("jsonwebtoken");
const config = require("../configs/config");

module.exports = async (ctx, role) => {
  const typeOfAuth = await typeof ctx.headers.authorization;
  const auth = await ctx.headers.authorization;
  if (typeOfAuth !== "undefined") {
    const token = auth.split(" ")[1];
    try {
      switch (role) {
        case 1:
          return await jwtToken.verify(token, config.jwtKey.admin, {
            algorithm: "HS256",
          });
        case 2:
          return await jwtToken.verify(token, config.jwtKey.manager, {
            algorithm: "HS256",
          });
        case 3:
          return await jwtToken.verify(token, config.jwtKey.employee, {
            algorithm: "HS256",
          });
        case 4:
          return await jwtToken.verify(token, config.jwtKey.user, {
            algorithm: "HS256",
          });
        default:
          return false;
      }
    } catch (error) {
      ctx.status = 403;
      return false;
    }
  } else {
    ctx.status = 401;
    return false;
  }
};
