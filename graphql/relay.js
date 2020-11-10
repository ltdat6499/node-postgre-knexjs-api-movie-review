const { makeExecutableSchema } = require("@graphql-tools/schema");
const { fromGlobalId } = require("graphql-relay");
const typeDefs = require("./type-def");
const pagination = require("./pagination");
const loaderAction = require("./loader-action");

const resolvers = {
     Query: {
          author: async (_, args, ctx) =>
               loaderAction.loadOneRow("authors", args.id),
          authors: async (_, args) => pagination("authors", args),
          book: async (_, args) => loaderAction.loadOneRow("books", args.id),
          books: async (_, args, ctx) => pagination("books", args),
          node: async (parent, args, ctx, resolveInfo) => {
               const { type, id } = fromGlobalId(args.id);
               const __type__ = type;
               const resource = type.toLowerCase() + "s";
               const res = await loaderAction.loadOneRow(resource, id);
               return {
                    ...res,
                    __type__,
               };
          },
     },
     Book: {
          author: async (parent) =>
               loaderAction.loadOneRow("authors", parent.id),
     },
     Author: {
          book: async (parent) =>
               loaderAction.loadManyRowByParentId(
                    "books",
                    parent.id,
                    "author_id"
               ),
     },
     Node: {
          __resolveType: async (obj) => {
               return obj.__type__;
          },
     },
};

module.exports = makeExecutableSchema({
     typeDefs,
     resolvers,
});
