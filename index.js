//Setup
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const jwtToken = require('jsonwebtoken')
const db = require('knex')({
    client: 'pg',
    version: '13.0',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '123456',
        database: 'todo'
    }
})
const privateKey = 'A very secret key'

//Config
const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

//JWT Authenticate

// app.use(jwt({
//     alg: "HS256",
//     typ: "JWT"
// }, {
//     myPayload: 'myPayload'
// }, {
//     secret: privateKey
// }).unless({ path: [/^\/login/] }))

//Middleware

router.get('/secret/', async  (ctx) => {
        let token = await jwtToken.sign({ "foo": "bar" }, 'A very secret key', { algorithm: "HS256" })
        ctx.body = token
        
})

router.post('/login/', async (ctx) => {
    if (ctx.request.body.password === 'password') {
        ctx.status = 200
        ctx.body = {
            token: jwtToken.sign({ myPayload: 'myPayload' }, privateKey, { algorithm: 'HS256' }),
            message: "Successfully logged in!"
        }
    } else {
        ctx.status = ctx.status = 401
        ctx.body = {
            message: "...Authentication failed"
        }
    }
})

router.get("/todos/get-all/", isAuthenticated, async (ctx) => {
    ctx.body = await
        db('todos')
            .select()
            .orderBy('id')
})

router.post("/todos/create/", async (ctx) => {
    let { message } = ctx.request.body
    let todo = { message, status: false }
    ctx.body = await
        db.insert(todo)
            .into('todos')
            .returning("*")
})

router.post("/todos/update/:id", async (ctx, next) => {
    let paramId = ctx.request.params.id
    let findTodoResult = await
        db('todos')
            .select('id')
            .where('id', paramId)
    if (findTodoResult.length < 0) {
        return ctx.body = 'Error';
    }
    let { message, status } = ctx.request.body
    let todo = {
        message: message,
        status: status
    }
    ctx.body = await
        db('todos')
            .update(todo)
            .where('id', paramId)
})

router.post("/todos/delete/:id", async (ctx, next) => {
    let paramId = ctx.request.params.id
    ctx.body = await
        db('todos')
            .where('id', paramId)
            .delete()
})

async function isAuthenticated(cxt, next) {

    if (typeof cxt.request.headers.authorization !== "undefined") {
        let token = cxt.request.headers.authorization.split(" ")[1]
        await jwtToken.verify(token, privateKey, { algorithm: "HS256" }, (err) => {
            if (err) {
                ctx.body.
                    ctx.body = {
                    status: 500,
                    message: 'Not Authorized'
                }
                throw new Error("Not Authorized")
            }
            return next()
        })
    } else {
        ctx.body.
            ctx.body = {
            status: 500,
            message: 'Not Authorized'
        }
        throw new Error("Not Authorized")
    }
}

app.use(router.routes())
    .use(router.allowedMethods())

//Port
app.listen(3000, () => {
    console.log(`listening on port ${3000}`)
})