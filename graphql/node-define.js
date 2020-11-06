const { nodeDefinitions, fromGlobalId } = require("graphql-relay");
const joinMonster = require("join-monster").default;

const db = require("../configs/database-connect");

const options = { dialect: "pg" };

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId, context, resolverInfo) => {
    const { type, id } = fromGlobalId(globalId);
    console.log("type", type, id);
    let a;
    try {
      a = await joinMonster.getNode(
        type,
        resolverInfo,
        context,
        parseInt(id),
        (sql) => {
          console.log(sql);
          return db.raw(sql);
        },
        options
      );
    } catch (eee) {
      console.log(eee);
    }
    return a;
  },

  (obj) => obj.__type__
);

module.exports = { nodeInterface, nodeField };
