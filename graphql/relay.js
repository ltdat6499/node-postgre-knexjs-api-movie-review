const { makeExecutableSchema } = require("@graphql-tools/schema");
const dataLoader = require("dataloader");
const lodash = require("lodash");
const db = require("../configs/database-connect");
const typeDefs = require("./type-def");

const resolvers = {
  Query: {
    author: async (_, { id }) =>
      await db("authors")
        .select()
        .where({ id })
        .first(),
    authorPage: async (_, { first, after }) => {},
    book: async (_, { id }) => {},
    bookPage: async (_, { first, after }) => {},
  },
  Book: {
    async author(parent) {
      return await db("authors")
        .select()
        .where("id", parent.author_id)
        .first();
    },
  },
  Author: {
    async book(author) {
      return await db("books")
        .select()
        .where({ author_id: author.id })
        .orderBy("id", "asc");
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
