const { nodeField } = require("./node-define");

const resolvers = {
  Query: {
    node: nodeField,
  },
  Node: {
    __resolveType(node) {
      return node.__type__;
    },
  },
};

module.exports = { resolvers };
