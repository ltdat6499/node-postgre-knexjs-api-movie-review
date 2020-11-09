const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const config = require("./configs/config");
const graphql = require("./routes/graphql");
const api = require("./routes/api");

const app = new Koa();

app.use(bodyParser());

app.use(graphql.routes()).use(graphql.allowedMethods());

app.use(api.routes()).use(api.allowedMethods());

app.listen(config.server.port, () => {
  console.log(`listening on port ${config.server.port}`);
});
