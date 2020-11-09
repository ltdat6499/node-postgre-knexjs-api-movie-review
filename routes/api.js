const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const getExcel = require("../api/index");
const getDatabase = require("../api/export-file");

router.all("/export", getDatabase);
router.all("/import", getExcel);

module.exports = router;
