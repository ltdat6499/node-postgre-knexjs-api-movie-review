require('dotenv').config()

module.exports = { 
    PG_CLIENT, PG_USER, PG_PASSWORD,
    PG_DB, PG_HOST, PG_PORT,
    JWT_KEY, PRIMARY_KEY, TBL_TODOS, 
    TBL_USERS, SV_PORT, MIGRATIONS, 
    SEED } = process.env