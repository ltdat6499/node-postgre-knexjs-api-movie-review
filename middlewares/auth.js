const jwtToken = require('jsonwebtoken')
const _ = require('../configs/constrant')

module.exports = async (ctx, next) => {
    let typeOfAuth = typeof ctx.request.headers.authorization
    let auth = ctx.request.headers.authorization
    if (typeOfAuth !== "undefined") {
        let token = auth.split(" ")[1]
        const isAuth = await jwtToken.verify(token, _.JWT_KEY, { algorithm: "HS256" })
        if(!isAuth){
            return ctx.body = {
                status: 401,
                message: 'Not Authorized'
            }
        }
        await next()
    } else {
        ctx.body = {
            status: 401,
            message: 'Not Authorized'
        }
    }
}