const jwtToken = require('jsonwebtoken')
const _ = require('../configs/config')
const db = require('../configs/database-connect')
const users = () => db(_.users.name)

const login = async (ctx) => {
    const { username, password } = ctx.request.body
    const resultId = await
        users()
            .select('id')
            .where({ username })
            .andWhere({ password })
            .first()
    if (!resultId) {
        ctx.status = 401
        return ctx.body.message = "...Authentication failed"
    }
    ctx.status = 200
    ctx.body = {
        token: jwtToken.sign(
            { 'id': resultId },
            _.jwtKey,
            { algorithm: "HS256" }),
        message: "Successfully logged in!"
    }
}
const getAll = async (ctx) => {
    ctx.body = await
        users()
            .select()
            .orderBy('id')
}
const create = async (ctx) => {
    const { username, password } = ctx.request.body
    ctx.body = await
        users()
            .insert({ username, password })
            .returning("*")
}
const update = async (ctx) => {
    const id = ctx.request.params.id
    const user = await
        users()
            .select('id')
            .where({ id })
            .first()
    if (!user) {
        return ctx.body = 'Error';
    }
    const { password } = ctx.request.body
    ctx.body = await
        users()
            .update({ password })
            .where({ id })
}
const del = async (ctx) => {
    const id = ctx.request.params.id
    ctx.body = await
        users()
            .where({ id })
            .delete()
}

module.exports = {
    login,
    getAll,
    create,
    update,
    delete: del
}