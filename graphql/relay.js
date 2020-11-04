const jwtToken = require("jsonwebtoken");
const joinMonsterAdapter = require("join-monster-graphql-tools-adapter");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const config = require("../configs/config");
const isPass = require("../middleware/passport");
const loaderAction = require("./loader-action");
const joinMonster = require("join-monster").default;

const schema = loadSchemaSync(__dirname + "/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const option = { dialect: "pg" };

const jm = (parent, args, ctx, resolveInfo) =>
  joinMonster(
    resolveInfo,
    ctx,
    async (sql) => {
      return await db.raw(sql);
    },
    option
  );

const resolvers = {
  Query: {
    author: async (parent, args, ctx, resolveInfo) => {
      if ((await isPass(ctx, 1)) || (await isPass(ctx, 2))) 
        return jm(parent, args, ctx, resolveInfo);
    },
    authors: async (parent, args, ctx, resolveInfo) => {
      if ((await isPass(ctx, 1)) || (await isPass(ctx, 2)))
        return jm(parent, args, ctx, resolveInfo);
    },
    book: async (parent, args, ctx, resolveInfo) => {
      if ((await isPass(ctx, 1)) || (await isPass(ctx, 3)))
        return jm(parent, args, ctx, resolveInfo);
    },
    books: async (parent, args, ctx, resolveInfo) => {
      if ((await isPass(ctx, 1)) || (await isPass(ctx, 2)))
        return jm(parent, args, ctx, resolveInfo);
    },
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
  Book: {
    authorId: (parent) => parent.author_id,
    author: async (parent) => loaderAction.loadOneRow("authors", parent.id),
  },
  Author: {
    book: async (parent) =>
      loaderAction.loadManyRowByParentId("books", parent.id, "author_id"),
  },
};

const resultSchema = addResolversToSchema({
  schema,
  resolvers,
});

joinMonsterAdapter(resultSchema, {
  Query: {
    fields: {
      book: {
        where: (table, args) => `${table}.id = ${args.id}`,
      },
      author: {
        where: (table, args) => `${table}.id = ${args.id}`,
        book: {
          sqlBatch: {
            thisKey: "author_id",
            parentKey: "id",
          },
        },
      },
      authors: {
        sqlTable: "authors",
        sqlPaginate: true,
        orderBy: {
          id: "asc",
        },
      },
      books: {
        sqlTable: "books",
        sqlPaginate: true,
        orderBy: {
          id: "asc",
        },
      },
    },
  },
  Book: {
    sqlTable: "books",
    uniqueKey: "id",
    fields: {
      genre: {
        sqlColumn: "genre",
      },
      name: {
        sqlColumn: "name",
      },
      authorId: {
        sqlColumn: "author_id",
      },
      author: {
        sqlBatch: {
          thisKey: "id",
          parentKey: "author_id",
        },
      },
    },
  },
  Author: {
    sqlTable: "authors",
    uniqueKey: "id",
    fields: {
      name: {
        sqlColumn: "name",
      },
      age: {
        sqlColumn: "age",
      },
      book: {
        sqlBatch: {
          thisKey: "author_id",
          parentKey: "id",
        },
      },
    },
  },
});

module.exports = resultSchema;
