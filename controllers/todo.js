const _ = require('../configs/config')
const db = require('../configs/database-connect')
const todos = () => db(_.todo.name)

const getAll = async (ctx) => {
    ctx.body = await
        todos()
            .select()
            .orderBy('id')
}
const create = async (ctx) => {
    const { message } = ctx.request.body
    ctx.body = await
        todos()
            .insert({ message, status: false })
            .returning("*")
}
const update = async (ctx) => {
    const id = ctx.request.params.id
    const todo = await
        todos()
            .select('id')
            .where({ id }).first()
    if (!todo) {
        return ctx.body = 'Error';
    }
    const { message, status } = ctx.request.body
    ctx.body = await
        todos()
            .update({ message, status })
            .where({ id })
}
const del = async (ctx) => {
    const id = ctx.request.params.id
    ctx.body = await
        todos()
            .where({ id })
            .delete()
}

module.exports = {
    getAll, create, update, delete: del
}