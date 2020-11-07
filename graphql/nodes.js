const { fromGlobalId } = require("graphql-relay");

const joinMonster = require("join-monster").default;

const db = require("../configs/database-connect");

const options = { dialect: "pg" };

const resolvers = {
  Query: {
    node: async (parent, args, ctx, resolveInfo) => {
      const { type, id } = fromGlobalId(args.id);
      return await joinMonster.getNode(
        type,
        resolveInfo,
        ctx,
        parseInt(id),
        //(sql) => dbCall(sql, knex, context),
        (sql) => db.raw(sql),
        options
      );
    },
  },
  Node: {
    __resolveType(obj) {
      return obj.__type__
    },
  },
};

module.exports = {
  resolvers,
};
