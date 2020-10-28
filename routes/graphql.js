const koaGraphQL = require("koa-graphql");
const Router = require("koa-router");
const executableSchema = require("../graphql/relay");
const router = new Router({ prefix: "/graphql" });

router.all(
  "/",
  koaGraphQL({
    schema: executableSchema,
    graphiql: true,
  })
);

module.exports = router;
