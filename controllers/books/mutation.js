const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const db = require("../../configs/database-connect");
const _ = require("../../configs/config");
const BookType = require("../../models/books");
const books = db(_.books.name);

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
      const { name, genre, authorId } = args;
      const [result] = await books
        .insert({
          name,
          genre,
          authorid: authorId,
        })
        .returning("*");
      return result;
    },
  },
};
