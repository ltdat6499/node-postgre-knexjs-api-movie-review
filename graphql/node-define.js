const { nodeDefinitions, fromGlobalId } = require("graphql-relay");
const joinMonster = require("join-monster").default;

const db = require("../configs/database-connect");

const options = { dialect: "pg" };

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId, context, resolverInfo) => {
    const { type, id } = fromGlobalId(globalId);
    console.log("type");
    return (
      await joinMonster.getNode(
        type,
        resolverInfo,
        context,
        parseInt(id),
        async (sql) => await db.raw(sql)
      ),
      options
    );
  },

  (obj) => obj.__type__
);

module.exports = { nodeInterface, nodeField };
