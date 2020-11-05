const _ = require("lodash");
const joinMonsterAdapter = require("join-monster-graphql-tools-adapter");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");
const { loadSchemaSync } = require("@graphql-tools/load");
const modules = [require("./authors"), require("./books"), require("./users")];
const schema = loadSchemaSync(__dirname + "/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const mergeAll = (items) => _.reduce(items, _.merge);

const resolvers = mergeAll(modules.map((m) => m.resolvers));
const jmDefs = mergeAll(modules.map((m) => m.jmDefs));

const resultSchema = addResolversToSchema({
  schema,
  resolvers,
});

joinMonsterAdapter(resultSchema, jmDefs);

module.exports = resultSchema;
