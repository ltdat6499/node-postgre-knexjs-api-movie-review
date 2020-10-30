const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");
const loaderAction = require("./loader-action");
const pagination = require("./pagination");

const schema = loadSchemaSync(__dirname + "/typedef.graphql", {
  loaders: [new GraphQLFileLoader()],
});

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

module.exports = addResolversToSchema({
  schema,
  resolvers,
});
