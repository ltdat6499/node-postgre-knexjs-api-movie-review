const isPass = require("../../middleware/passport");
const jm = require("./join-monster");

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
  },
};

const jmDef = {
  Query: {
    fields: {
      author: {
        where: (table, args) => `${table}.id = ${args.id}`,
      },
      authors: {
        sqlTable: "authors",
        sqlPaginate: true,
        orderBy: {
          id: "asc",
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
        sqlJoin: (authorTable, bookTable, args) =>
          `${authorTable}.id = ${bookTable}.author_id`,
      },
    },
  },
};

module.exports = {
  resolvers,
  jmDef,
};
