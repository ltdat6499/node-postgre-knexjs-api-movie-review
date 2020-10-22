const jwtToken = require('jsonwebtoken')
const _ = require('../configs/constrant')

module.exports = async (ctx, next) => {
    let typeOfAuth = typeof ctx.request.headers.authorization
    let auth = ctx.request.headers.authorization
    if (typeOfAuth !== "undefined") {
        let token = auth.split(" ")[1]
        try {
            const isAuth = await jwtToken.verify(token, _.JWT_KEY, { algorithm: "HS256" })
            await next()
        }
        catch (error) {
            ctx.status = 403
            return ctx.body = {
                message: 'Error token'
            }
        }
    } else {
        ctx.status = 401
        ctx.body = {
            message: 'Token required'
        }
    }
}