const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const _ = require('./configs/config')
const todoRouter = require('./routes/todo')
const usersRouter = require('./routes/users')
const graphql = require('./graphql/index')

const app = new Koa()

app.use(bodyParser())
app.use(cors())

app.use(todoRouter.routes())
app.use(usersRouter.routes())

app.use(graphql.routes()).use(graphql.allowedMethods())

app.listen(_.server.port, () => {
    console.log(`listening on port ${_.server.port}`)
})