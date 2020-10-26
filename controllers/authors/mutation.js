const db = require("../../configs/database-connect");
const _ = require("../../configs/config");
const AuthorType = require("../../models/authors");
const authors = db(_.authors.name);

const { GraphQLString, GraphQLNonNull } = require("graphql");

module.exports = {
  addAuthor: {
    type: AuthorType,
    description: "Add an author",
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (args) => {
      await authors
        .insert({ name: args.name, age: args.age, authorid: args.bookId })
        .returning("*");
    },
  },
};
