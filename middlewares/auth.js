const jwtToken = require('jsonwebtoken')
const _ = require('../configs/constrant')

module.exports = async (ctx, next) => {
    let typeOfAuth = typeof ctx.request.headers.authorization
    let auth = ctx.request.headers.authorization
    if (typeOfAuth !== "undefined") {
        let token = auth.split(" ")[1]
        await jwtToken.verify(token, _.PRIVATE_KEY, { algorithm: "HS256" }, (ctx, err) => {
            if (err) {
                return ctx.body = {
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