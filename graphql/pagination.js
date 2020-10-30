const db = require("../configs/database-connect");
const pageAction = require("./page-action");
const dataloader = require("./dataloader");

const pagination = async (table, first, preCount, res) => {
  const [{ count }] = preCount;

  let edges = res.map((item) => {
    return {
      cursor: item.id,
      node: item,
    };
  });

  const lastIdOfEdges = edges[edges.length - 1].node.id;
  const firstIdOfEdges = edges[0].node.id;
  const pageInfo = {
    hasNextPage: pageAction.hasNextPage(table, lastIdOfEdges),
    hasPreviousPage: pageAction.hasPreviousPage(table, firstIdOfEdges, first),
    startCursor: firstIdOfEdges,
    endCursor: lastIdOfEdges,
  };

  return {
    edges,
    totalCount: count,
    pageInfo,
  };
};

module.exports = async (table, args) => {
  let ids = await db(table)
    .select("id")
    .limit(args.first)
    .whereRaw(`id > ?`, args.after)
    .limit(args.first);
  ids = Object.keys(ids).map((key) => ids[key].id);
  const res = await dataloader(table).loader.load(ids);
  const count = await db(table).count("*");

  return pagination(table, args.first, count, res);
};
