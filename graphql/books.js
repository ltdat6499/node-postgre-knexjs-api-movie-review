const isPass = require("../middleware/passport");
const jm = require("./join-monster");

const resolvers = {
  Query: {
    book: async (parent, args, ctx, resolveInfo) => {
      if ((await isPass(ctx, 1)) || (await isPass(ctx, 3)))
        return jm(parent, args, ctx, resolveInfo);
    },
    books: async (parent, args, ctx, resolveInfo) => {
      if ((await isPass(ctx, 1)) || (await isPass(ctx, 2)))
        return jm(parent, args, ctx, resolveInfo);
    },
  },
};

const jmDef = {
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
        sqlJoin: (bookTable, authorTable, args) =>
          `${bookTable}.author_id = ${authorTable}.id`,
      },
    },
  },
};

module.exports = {
  resolvers,
  jmDef,
};
