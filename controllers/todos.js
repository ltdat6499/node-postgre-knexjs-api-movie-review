const _ = require('../configs/constrant')
const db = require('../configs/database-connect')
const todos = () => db(_.TBL_TODOS)

const getAll = async (ctx) => {
    console.log(ctx)
    ctx.body = await
        todos()
            .select()
            .orderBy(_.PRIMARY_KEY)
            console.log(ctx.body)
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
            .select(_.PRIMARY_KEY)
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
    getAll, create, update, delete:del
}