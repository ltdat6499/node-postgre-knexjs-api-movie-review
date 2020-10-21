const Router = require('koa-router')
const login = require('../controllers/users')
const isAuthenticated = require('../middlewares/auth')

const router = new Router({ prefix: '/users' })

router.post('/login', isAuthenticated, login)
router.get("/", isAuthenticated, _.getAll)
router.post("/create", isAuthenticated, _.create)
router.post("/update/:id", isAuthenticated, _.update)
router.post("/delete/:id", isAuthenticated, _.delete)

module.exports = router