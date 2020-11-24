const { makeExecutableSchema } = require("@graphql-tools/schema");
const jwtToken = require("jsonwebtoken");
const { fromGlobalId } = require("graphql-relay");
const db = require("../configs/database-connect");
const acl = require("../middleware/check-permission");
const config = require("../configs/config");
const typeDefs = require("./type-def");
const pagination = require("./pagination");
const loaderAction = require("./loader-action");

const resolvers = {
  Query: {
    author: async (_, args, ctx, info) => {
      return await acl(
        ctx,
        "author_read",
        async () => await loaderAction.loadOneRow("authors", args.id)
      );
    },
    authors: async (_, args, ctx, info) =>
      await acl(
        ctx,
        "author_read",
        async () => await pagination("authors", args)
      ),
    book: async (_, args) => {
      return await havePermissions(
        ctx,
        { resource: "book", roles: "read" },
        async () => await loaderAction.loadOneRow("books", args.id)
      );
    },
    books: async (_, args) => {
      return await havePermissions(
        ctx,
        { resource: "book", roles: "read" },
        async () => await loaderAction.pagination("books", args)
      );
    },
    node: async (parent, args, ctx, resolveInfo) => {
      const { type, id } = fromGlobalId(args.id);
      const __type__ = type;
      const resource = type.toLowerCase() + "s";
      const res = await loaderAction.loadOneRow(resource, id);
      return {
        ...res,
        __type__,
      };
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
          key = config.jwtKey.admin;
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
    author: async (parent) => loaderAction.loadOneRow("authors", parent.id),
  },
  Author: {
    book: async (parent) =>
      loaderAction.loadManyRowByParentId("books", parent.id, "author_id"),
  },
  Node: {
    __resolveType: async (obj) => {
      return obj.__type__;
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});

