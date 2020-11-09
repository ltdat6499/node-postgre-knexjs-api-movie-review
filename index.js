const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const config = require("./configs/config");
const graphql = require("./routes/graphql");

const app = new Koa();

app.use(bodyParser());

app.use(graphql.routes()).use(graphql.allowedMethods());

app.listen(config.server.port, () => {
  console.log(`listening on port ${config.server.port}`);
});
