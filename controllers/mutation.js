const authors = require("./authors/mutation");
const books = require("./books/mutation");

const { GraphQLObjectType } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields:  () => ({
    ...authors,
    ...books,
  }) 
});
