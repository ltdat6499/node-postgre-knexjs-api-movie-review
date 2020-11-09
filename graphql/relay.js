const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const typeDefs = require("./type-def");
const pagination = require("./pagination");
const loaderAction = require("./loader-action");
const { fromGlobalId } = require("graphql-relay");

const resolvers = {
  Query: {
    author: async (_, args, ctx) => loaderAction.loadOneRow("authors", args.id),
    authors: async (_, args) => pagination("authors", args),
    book: async (_, args) => loaderAction.loadOneRow("books", args.id),
    books: async (_, args, ctx) => pagination("books", args),
    node: async (_, args, ctx) => {
      const { type, id } = fromGlobalId(args.id);
      switch (type) {
        case "Book":
          return async () => loaderAction.loadOneRow("books", id);
        case "Author":
          return async () => loaderAction.loadOneRow("authors", id);
      }
    },
  },
  Book: {
    author: async (parent) => loaderAction.loadOneRow("authors", parent.id),
  },
  Author: {
    book: async (parent) =>
      loaderAction.loadManyRowByParentId("books", parent.id, "author_id"),
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
