const koaGraphQL = require("koa-graphql");
const Router = require("koa-router");
const executableSchema = require("../models/relay");
const router = new Router({ prefix: "/graphql" });
// const RootQueryType = require("../controllers/query");
// const RootMutationType = require("../controllers/mutation");
// const { GraphQLSchema } = require("graphql");

// const schema = new GraphQLSchema({
//   query: RootQueryType,
//   mutation: RootMutationType,
// });

router.all(
  "/",
  koaGraphQL({
    schema: executableSchema,
    graphiql: true,
  })
);

module.exports = router;
