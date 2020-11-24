const koaGraphQL = require("koa-graphql");
const Router = require("koa-router");
const executableSchema = require("../graphql/index");
const router = new Router({ prefix: "/graphql" });

router.all(
  "/",
  koaGraphQL(async (ctx) => {
    return {
      schema: executableSchema,
      graphiql: true,
      ctx,
      debug: true,
    };
  })
);

module.exports = router;
