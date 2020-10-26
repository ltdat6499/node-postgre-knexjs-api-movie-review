const db = require("../../configs/database-connect");
const _ = require("../../configs/config");
const bookType = require("../../models/books");
const books = db(_.books.name);

const { GraphQLList, GraphQLInt } = require("graphql");

module.exports = {
  book: {
    type: bookType,
    description: "A Single Book",
    args: {
      id: { type: GraphQLInt },
    },
    resolve: async (args) => await books.where("id", args.id).first(),
  },
  books: {
    type: new GraphQLList(bookType),
    description: "List of All Books",
    resolve: async () => await books.select().orderBy("id"),
  },
};
