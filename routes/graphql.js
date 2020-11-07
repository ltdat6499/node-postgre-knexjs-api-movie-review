const graphqlHTTP = require("koa-graphql");
const Router = require("koa-router");
const MyGraphQLSchema = require("../graphql/index");
const router = new Router({ prefix: "/graphql" });

router.all(
  "/",
  graphqlHTTP(async (ctx) => {
    return {
      schema: MyGraphQLSchema,
      graphiql: true,
    };
  })
);

module.exports = router;
