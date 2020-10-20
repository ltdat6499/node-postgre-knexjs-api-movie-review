//Setup
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const Router = require('koa-router')

//Config
const port = process.env.PORT || 3000
const router = new Router()
const app = new koa()

app.use(bodyParser())
app.use(cors())

//main



//Port
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})