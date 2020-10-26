const db = require("../configs/database-connect");
const _ = require("../configs/config");
const authorType = require("./authors");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    authorid: { type: GraphQLInt },
    genre: { type: GraphQLString },
    author: {
      type: authorType,
      resolve: async (parent) => {
        return await db(_.authors.name)
          .select()
          .where("id", parent.authorid);
      },
    },
  }),
});
