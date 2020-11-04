const isPass = require("../../middleware/passport");
const loaderAction = require("../loader-action");
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
  Author: {
    book: async (parent) =>
      loaderAction.loadManyRowByParentId("books", parent.id, "author_id"),
  },
};

const jmDef = {
  Query: {
    fields: {
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
};

module.exports = {
  resolvers,
  jmDef,
};
