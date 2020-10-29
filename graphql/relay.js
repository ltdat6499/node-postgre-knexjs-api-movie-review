const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const typeDefs = require("./type-def");

const getLastOfTable = async (table) => {
  return await db(table)
    .select()
    .orderBy("id", "desc")
    .first();
};

const countItemBeforeId = async (table, id) => {
  return await db(table)
    .select()
    .count("*")
    .whereRaw(`id < ?`, id);
};

const hasNextPage = async (table, id) => {
  const lastRow = await getLastOfTable(table);
  const lastId = lastRow.id;
  if (lastId > id) return true;
  return false;
};

const hasPreviousPage = async (table, id, range) => {
  const [{ count }] = await countItemBeforeId(table, id);
  if (count >= range) return true;
  return false;
};

const pagination = async (table, first, after) => {
  const [{ count }] = await db(table).count("*");

  const rawEdges = await db(table)
    .select()
    .whereRaw(`id > ?`, after)
    .limit(first);

  const edges = rawEdges.map((item) => {
    return {
      cursor: item.id,
      node: item,
    };
  });

  const lastIdOfEdges = edges[edges.length - 1].node.id;
  const firstIdOfEdges = edges[0].node.id;
  const pageInfo = {
    hasNextPage: hasNextPage(table, lastIdOfEdges),
    hasPreviousPage: hasPreviousPage(table, firstIdOfEdges, first),
    startCursor: firstIdOfEdges,
    endCursor: lastIdOfEdges,
  };

  return {
    edges,
    totalCount: count,
    pageInfo,
  };
};

const resolvers = {
  Query: {
    author: async (_, { id }) =>
      await db("authors")
        .select()
        .where({ id })
        .first(),
    authorPage: async (_, { first, after }) =>
      pagination("authors", first, after),
    book: async (_, { id }) =>
      await db("books")
        .select()
        .where({ id })
        .first(),
    bookPage: async (_, { first, after }) => pagination("books", first, after),
  },
  Mutation: {
    createAuthor: async (_, { name, age }) => {
      const [result] = await db("authors")
        .insert({ name, age })
        .returning("*");
      return result;
    },
    createBook: async (_, { name, genre, author_id }) => {
      const [result] = await db("books")
        .insert({ name, genre, author_id })
        .returning("*");
      return result;
    },
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
