const isPass = require("../../middleware/passport");
const loaderAction = require("../loader-action");
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
  Book: {
    authorId: (parent) => parent.author_id,
    author: async (parent) => loaderAction.loadOneRow("authors", parent.id),
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
        sqlBatch: {
          thisKey: "id",
          parentKey: "author_id",
        },
      },
    },
  },
};

module.exports = {
  resolvers,
  jmDef,
};
