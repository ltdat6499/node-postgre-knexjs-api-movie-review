const jwtToken = require('jsonwebtoken')
const _ = require('../configs/config')

exports.jwtPassport = async (ctx, next) => {
    const typeOfAuth = typeof ctx.request.headers.authorization
    const auth = ctx.request.headers.authorization
    if (typeOfAuth !== "undefined") {
        const token = auth.split(" ")[1]
        try {
            await jwtToken.verify(token, _.jwtKey, { algorithm: "HS256" })
        }
        catch (error) {
            ctx.status = 403
            return ctx.body = {
                message: 'Error token'
            }
        }
        await next()
    } else {
        ctx.status = 401
        ctx.body = {
            message: 'Token required'
        }
    }
}