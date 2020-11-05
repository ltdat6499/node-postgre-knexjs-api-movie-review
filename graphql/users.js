const jwtToken = require("jsonwebtoken");
const config = require("../configs/config");
const db = require("../configs/database-connect");

const resolvers = {
  Query: {
    login: async (_, args, ctx) => {
      const { username, password } = args;
      const result = await db("users")
        .select()
        .where({ username, password })
        .first();
      if (!result) {
        ctx.status = 401;
        return {
          message: "Wrong username or password",
          jwt: "null",
        };
      }
      let key;
      switch (result.role) {
        case 1:
          key = config.jwtKey.admin;
          break;
        case 2:
          key = config.jwtKey.manager;
          break;
        case 3:
          key = config.jwtKey.employee;
          break;
        case 4:
          key = config.jwtKey.user;
          break;
        default:
          return {
            message: "Want to hack ?",
            jwt: "null",
          };
      }
      ctx.status = 200;
      return {
        message: "Successfully logged in!",
        jwt: jwtToken.sign({ id: result.id }, key, {
          algorithm: "HS256",
        }),
      };
    },
  },
};

module.exports = {
  resolvers,
};
