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
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorid: { type: GraphQLNonNull(GraphQLInt) },
    genre: { type: GraphQLNonNull(GraphQLString) },
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
