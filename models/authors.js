const db = require("../configs/database-connect");
const _ = require("../configs/config");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Author",
  description: "This represents a author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(bookType),
      resolve: async (parent) => {
        return await db(_.books.name)
          .select()
          .where("authorid", parent.id);
      },
    },
  }),
});

const bookType = require("./books");
