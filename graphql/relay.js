const jwtToken = require("jsonwebtoken");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const config = require("../configs/config");
const isPass = require("../middleware/passport");
const loaderAction = require("./loader-action");
const pagination = require("./pagination");

const schema = loadSchemaSync(__dirname + "/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = {
  Query: {
    author: async (_, args, ctx) => {
      if (await isPass(ctx, 1) || await isPass(ctx, 2)) 
        return loaderAction.loadOneRow("authors", args.id);
    },
    authors: async (_, args, ctx) =>{
      if (await isPass(ctx, 1) || await isPass(ctx, 2)) 
        return  pagination("authors", args)
    },
    book: async (_, args, ctx) => {
      if (await isPass(ctx, 3) || await isPass(ctx, 1)) 
        return loaderAction.loadOneRow("books", args.id)
    },
    books: async (_, args, ctx) => {
      if (await isPass(ctx, 3) || await isPass(ctx, 1)) 
        return pagination("books", args)
    }, 
    login: async (_, args, ctx) => {
      const username = args.username;
      const password = args.password;
      console.log(args);
      const result = await db("users")
        .select()
        .where({ username, password })
        .first();

      if (!result) {
        ctx.status = 401;
        return (ctx.body.message = "Wrong username or password");
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
