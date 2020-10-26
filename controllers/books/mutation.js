const db = require("../../configs/database-connect");
const _ = require("../../configs/config");
const BookType = require("../../models/books");
const books = db(_.books.name);

const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

module.exports = {
  addBook: {
    type: BookType,
    description: "Add a book",
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      authorId: { type: GraphQLNonNull(GraphQLInt) },
      genre: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, ctx, info) => {
      const [result] = await books
        .insert({
          name: args.name,
          genre: args.genre,
          authorid: args.authorId,
        })
        .returning("*");
      return result;
    },
  },
};
