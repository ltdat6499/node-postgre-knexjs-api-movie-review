const Router = require('koa-router')
const router = new Router({ prefix: '/todos' })
const _ = require('../controllers/todos')
const isAuthenticated = require('../middlewares/auth')

router.get("/", isAuthenticated, _.getAll)
router.post("/create", isAuthenticated, _.create)
router.post("/update/:id", isAuthenticated, _.update)
router.post("/delete/:id", isAuthenticated, _.delete)

module.exports = router