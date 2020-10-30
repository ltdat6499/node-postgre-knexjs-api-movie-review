const DataLoader = require("dataloader");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const typeDefs = require("./type-def");

const getLoaders = (table) => ({
  loader: new DataLoader(async (list) => {
    return await list.map(async (ids) => {
      return await db(table).whereRaw(`id = ANY(?)`, [ids]);
    });
  }),
});

const resolvers = {
  Query: {
    authors: async (_, args, ctx) => {
      let idList = await db("authors").select("id");
      idList = Object.keys(idList).map((key) => idList[key].id);
      const res = await getLoaders("authors").loader.load(idList);
      return res;
    },
    author: async (_, args, ctx) => {
      const [res] = await getLoaders("authors").loader.load([args.id]);
      return res;
    },
    books: async (_, args, ctx) => {
      let idList = await db("books").select("id");
      idList = Object.keys(idList).map((key) => idList[key].id);
      const res = await getLoaders("books").loader.load(idList);
      return res;
    },
    book: async (_, args, ctx) => {
      const [res] = await getLoaders("books").loader.load([args.id]);
      return res;
    },
  },
  Book: {
    author: async (parent, args, ctx) => {
      const [res] = await getLoaders("authors").loader.load([parent.id]);
      return res;
    },
  },
  Author: {
    book: async (parent, args, ctx) => {
      let idList = await db("books").select("id").where('author_id', parent.id);
      idList = Object.keys(idList).map((key) => idList[key].id);
      const res = await getLoaders("authors").loader.load(idList);
      return res;
    },
  },
};

module.exports = {
  makeExecutableSchema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  loader: getLoaders(),
};
