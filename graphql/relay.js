const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const typeDefs = require("./type-def");
const pagination = require("./pagination");
const loaderAction = require("./loader-action");

const resolvers = {
  Query: {
    author: async (_, args, ctx) => loaderAction.loadOneRow("authors", args.id),
    authors: async (_, args) => pagination("authors", args),
    book: async (_, args) => loaderAction.loadOneRow("books", args.id),
    books: async (_, args, ctx) => pagination("books", args),
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
