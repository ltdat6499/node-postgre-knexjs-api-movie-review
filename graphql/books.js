const { globalIdField } = require("graphql-relay");

const jm = require("./join-monster");
const resolvers = {
  Query: {
    book: async (parent, args, ctx, resolveInfo) =>
      jm(parent, args, ctx, resolveInfo, 1),
    books: async (parent, args, ctx, resolveInfo) =>
      jm(parent, args, ctx, resolveInfo, 2),
  },
};

const jmDefs = {
  Query: {
    fields: {
      book: {
        where: (table, args) => `${table}.id = ${args.id}`,
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
    name: "Book",
    sqlTable: "books",
    uniqueKey: "id",
    fields: {
      id: {
        ...globalIdField("Book"),
      },
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
        sqlJoin: (bookTable, authorTable, args) =>
          `${bookTable}.author_id = ${authorTable}.id`,
      },
    },
  },
};

module.exports = {
  resolvers,
  jmDefs,
};
