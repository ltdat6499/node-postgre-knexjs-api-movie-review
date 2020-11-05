const isPass = require("../middleware/passport");
const jm = require("./join-monster");

const resolvers = {
  Query: {
    author: async (parent, args, ctx, resolveInfo) =>
      jm(parent, args, ctx, resolveInfo, 1),
    authors: async (parent, args, ctx, resolveInfo) =>
      jm(parent, args, ctx, resolveInfo, 1),
  },
};

const jmDefs = {
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
  jmDefs,
};
