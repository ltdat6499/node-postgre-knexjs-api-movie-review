const jwtToken = require("jsonwebtoken");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const config = require("../configs/config");
const isPass = require("../middleware/passport");
const loaderAction = require("./loader-action");
const pagination = require("./pagination");
const User = require("../acl");

const schema = loadSchemaSync(__dirname + "/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const havePermissions = async (ctx, permis, next) => {
  const typeOfAuth = await typeof ctx.headers.authorization;
  const auth = await ctx.headers.authorization;
  if (typeOfAuth == "undefined") {
    ctx.response.status = 401;
    ctx.throw("Hack?");
  }
  const token = auth.split(" ")[1];
  let payload = jwtToken.verify(token, config.jwtKey.admin);
  const id = payload.id;
  const roles = await db("roles")
    .select("role")
    .where("user_id", id + "");
  let user = new User();
  for (const { role } of roles) {
    const [resource, roles] = role.split(" ");
    await user.setPermissions({
      resource,
      roles,
    });
  }
  if (user.havePermissions(permis)) return await next();
  ctx.response.status = 403;
  ctx.throw("U dont have permission to read author");
};

const resolvers = {
  Query: {
    author: async (_, args, ctx) => {
      return await havePermissions(
        ctx,
        { resource: "author", roles: "write" },
        async () => {
          console.log(await loaderAction.loadOneRow("authors", args.id));
          return await loaderAction.loadOneRow("authors", args.id);
        }
      );
    },
    authors: async (_, args, ctx) => {
      return await havePermissions(
        ctx,
        { resource: "book", roles: "write" },
        async () => {
          return pagination("authors", args);
        }
      );
    },
    book: async (_, args, ctx) => {
      return loaderAction.loadOneRow("books", args.id);
    },
    books: async (_, args, ctx) => {
      if ((await isPass(ctx, 3)) || (await isPass(ctx, 1)))
        return pagination("books", args);
    },
    login: async (_, args, ctx) => {
      const username = args.username;
      const password = args.password;
      const result = await db("users")
        .select()
        .where({ username, password })
        .first();

      if (!result) {
        ctx.status = 401;
        return (ctx.body = "Wrong username or password");
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
          return (ctx.body.message = "Hack ?");
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
  Book: {
    authorId: (parent) => parent.author_id,
    author: async (parent) => loaderAction.loadOneRow("authors", parent.id),
  },
  Author: {
    book: async (parent) =>
      loaderAction.loadManyRowByParentId("books", parent.id, "author_id"),
  },
};

module.exports = addResolversToSchema({
  schema,
  resolvers,
});
