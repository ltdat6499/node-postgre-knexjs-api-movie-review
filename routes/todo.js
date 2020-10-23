const Router = require('koa-router')
const router = new Router({ prefix: '/todo' })
const _ = require('../controllers/todo')
const passport = require('../middleware/passport')

router.get("/", passport.jwtPassport, _.getAll)
router.post("/create", passport.jwtPassport, _.create)
router.post("/update/:id", passport.jwtPassport, _.update)
router.post("/delete/:id", passport.jwtPassport, _.delete)

module.exports = router