const { makeExecutableSchema } = require("@graphql-tools/schema");
const { as } = require("../configs/database-connect");
const db = require("../configs/database-connect");
const typeDefs = require("./type-def");

async function getLastOfTable(table) {
  return await db(table)
    .select()
    .orderBy("id", "desc")
    .first();
}

async function countItemBeforeId(table, id) {
  return await db(table)
    .select()
    .count("*")
    .whereRaw(` id < ${id}`);
}

async function hasNextPage(table, id) {
  const lastId = (await getLastOfTable(table)).id;
  if (lastId > id) return 1;
  return 0;
}

async function hasPreviousPage(table, id, range) {
  const [{ count }] = await countItemBeforeId(table, id);
  if (count >= range) return 1;
  return 0;
}

async function pagination(table, first, after) {
  const [{ count }] = await db(table).count("*");

  const edges = (
    await db(table)
      .select()
      .whereRaw(` id > ${after} `)
      .limit(first)
  ).map((item) => {
    return {
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
}

const resolvers = {
  Query: {
    author: async (_, { id }) =>
      await db("authors")
        .select()
        .where({ id })
        .first(),
    authors: async () =>
      console.log(
        await db("books")
          .select()
          .where("id", 11)
      ),
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
  BookConnection: {},
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
