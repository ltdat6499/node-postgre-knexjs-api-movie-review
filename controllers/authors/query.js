const db = require("../../configs/database-connect");
const _ = require("../../configs/config");
const AuthorType = require("../../models/authors");
const authors = db(_.authors.name);

const { GraphQLList, GraphQLInt } = require("graphql");

module.exports = {
  authors: {
    type: new GraphQLList(AuthorType),
    description: "List of All Authors",
    resolve: async () => await authors.select().orderBy("id"),
  },
  author: {
    type: AuthorType,
    description: "A Single Author",
    args: {
      id: { type: GraphQLInt },
    },
    resolve: async (args) => await authors.where("id", args.id).first(),
  },
};
