//Setup
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const _ = require('./configs/constrant')
const todosRouter = require('./routes/todos')
const usersRouter = require('./routes/users')

const app = new Koa()

app.use(bodyParser())
app.use(cors())
app.use(usersRouter.routes())
app.use(todosRouter.routes())

app.listen(_.SV_PORT, () => {
    console.log(`listening on port ${_.SV_PORT}`)
})