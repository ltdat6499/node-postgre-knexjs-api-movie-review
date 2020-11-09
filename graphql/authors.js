const { globalIdField } = require("graphql-relay");
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
    name: "Author",
    sqlTable: "authors",
    uniqueKey: "id",
    type: "Author",
    fields: {
      id: {
        ...globalIdField("Author"),
      },
      name: {
        sqlColumn: "name",
      },
      age: {
        sqlColumn: "age",
      },
      books: {
        orderBy: {
          id: "asc",
        },
        sqlPaginate: true,
        sqlJoin: (authorTable, bookTable, args) =>
          `${authorTable}.id = ${bookTable}.author_id`,
      },
    },
    resolveType: "Author",
  },
};

module.exports = {
  resolvers,
  jmDefs,
};
