const DataLoader = require("dataloader");
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

const removeElement = (array, elem) => {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const pagination = async (table, first, after, res) => {
  const [{ count }] = await db(table).count("*");

  let edges = res.map((item) => {
    return {
      cursor: item.id,
      node: item,
    };
  });

  let itemListRemove = [];

  edges.forEach((edge) => {
    itemListRemove.push(edge);
  });

  itemListRemove.forEach((item) => {
    if (item.node.id <= after) removeElement(edges, item);
  });

  edges = edges.slice(0, first);

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
      return await getLoaders("authors").loader.load(idList);
    },
    author: async (_, args, ctx) => {
      const [res] = await getLoaders("authors").loader.load([args.id]);
      return res;
    },
    authorPage: async (_, args, ctx) => {
      let idList = await db("authors").select("id");
      idList = Object.keys(idList).map((key) => idList[key].id);
      const res = await getLoaders("authors").loader.load(idList);

      return pagination("authors", args.first, args.after, res);
    },

    books: async (_, args, ctx) => {
      let idList = await db("books").select("id");
      idList = Object.keys(idList).map((key) => idList[key].id);
      return await getLoaders("books").loader.load(idList);
    },
    book: async (_, args, ctx) => {
      const [res] = await getLoaders("books").loader.load([args.id]);
      return res;
    },
    bookPage: async (_, args, ctx) => {
      let idList = await db("books").select("id");
      idList = Object.keys(idList).map((key) => idList[key].id);
      const res = await getLoaders("books").loader.load(idList);

      return pagination("books", args.first, args.after, res);
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
      let idList = await db("books")
        .select("id")
        .where("author_id", parent.id);
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
