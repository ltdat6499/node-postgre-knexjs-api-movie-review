//Setup
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const jwtToken = require('jsonwebtoken')
require('dotenv').config()
const { CLIENT, POSTGRES_USER, POSTGRES_PASSWORD,
    POSTGRES_DB, DB_HOST, PRIVATE_KEY, POSTGRES_TABLE,
    SERVER_PORT } = process.env
const db = require('knex')({
    client: CLIENT,
    version: '13.0',
    connection: {
        host: DB_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    }
})

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

const isAuthenticated = async (ctx, next) => {
    let typeOfAuth = typeof ctx.request.headers.authorization
    let auth = ctx.request.headers.authorization
    if (typeOfAuth !== "undefined") {
        let token = auth.split(" ")[1]
        await jwtToken.verify(token, PRIVATE_KEY, { algorithm: "HS256" }, (ctx, err) => {
            if (err) {
                    ctx.body = {
                    status: 401,
                    message: 'Not Authorized'
                }
            }
            next()
        })
    } else {
        ctx.body = {
            status: 401,
            message: 'Not Authorized'
        }
    }
}

router.get("/secret/", async (ctx) => {
    ctx.body = await jwtToken.sign(
        { "myPayload": "myPayload" }, 
        PRIVATE_KEY, 
        { algorithm: "HS256" })
})

router.post("/login/", async (ctx) => {
    let password = ctx.request.body.password
    if (password !== 'password') {
        ctx.status = 401
        ctx.body.message = "...Authentication failed"
    }
    ctx.status = 200
    return ctx.body = {
        token: jwtToken.sign(
            { myPayload: 'myPayload' },
            PRIVATE_KEY,
            { algorithm: 'HS256' }),
        message: "Successfully logged in!"
    }
})

router.get("/todos/get-all/", isAuthenticated, async (ctx) => {
    ctx.body = await
            db(POSTGRES_TABLE)
            .select()
            .orderBy(POSTGRES_PRIMARY_KEY_COLUMN)
})

router.post("/todos/create/", isAuthenticated, async (ctx) => {
    let { message } = ctx.request.body
    let todo = { message, status: false }
    ctx.body = await
            db.insert(todo)
            .into(POSTGRES_TABLE)
            .returning("*")
})

router.post("/todos/update/:id", isAuthenticated, async (ctx, next) => {
    let paramId = ctx.request.params.id
    let findTodoResult = await
        db(POSTGRES_TABLE)
            .select(POSTGRES_PRIMARY_KEY_COLUMN)
            .where(POSTGRES_PRIMARY_KEY_COLUMN, paramId)
    if (findTodoResult.length < 0) {
        return ctx.body = 'Error';
    }
    let { message, status } = ctx.request.body
    let todo = {
        message: message,
        status: status
    }
    ctx.body = await
        db(POSTGRES_TABLE)
            .update(todo)
            .where(POSTGRES_PRIMARY_KEY_COLUMN, paramId)
})

router.post("/todos/delete/:id", isAuthenticated, async (ctx, next) => {
    let paramId = ctx.request.params.id
    ctx.body = await
            db(POSTGRES_TABLE)
            .where(POSTGRES_PRIMARY_KEY_COLUMN, paramId)
            .delete()
})

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
})