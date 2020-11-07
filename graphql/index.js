const requireText = require("require-text");
const graphql = require("graphql");
const _ = require("lodash");
const jmAdapt = require("join-monster-graphql-tools-adapter");
const { makeExecutableSchema } = require("graphql-tools");
const source = requireText("./schema.graphql", require);
const typeDefs = graphql.parse(source);
const modules = [
  require("./authors"),
  require("./books"),
  require("./users"),
  require("./nodes")
];

const mergeAll = (items) => _.reduce(items, _.merge);

const resolvers = mergeAll(modules.map((m) => m.resolvers));
const jmDefs = mergeAll(modules.map((m) => m.jmDefs));

const schema = makeExecutableSchema({ typeDefs, resolvers });
jmAdapt(schema, jmDefs);
module.exports = schema;
