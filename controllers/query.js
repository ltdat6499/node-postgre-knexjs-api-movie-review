const authors = require("./authors/query");
const books = require("./books/query");

const { GraphQLObjectType } = require("graphql");


module.exports = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields:  () => ({
    ...authors,
    ...books,
  }) 
});
