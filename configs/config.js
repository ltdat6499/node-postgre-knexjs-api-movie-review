require('dotenv').config()

module.exports = {
    PG_CLIENT, PG_USER, PG_PASSWORD,
    PG_DB, PG_HOST, PG_PORT,
    JWT_KEY, PRIMARY_KEY, TBL_TODOS,
    TBL_USERS, SV_PORT, MIGRATIONS,
    SEED
} = process.env

// const config = {
//     db: {
//         client: PG_CLIENT,
//         user: PG_USER,
//         password: PG_PASSWORD,
//         db: PG_DB,
//         host: PG_HOST,
//         port: PG_PORT
//     },
//     jwtKey: JWT_KEY,
//     server: {
//         port: SV_PORT,
//         migration: MIGRATIONS,
//         seed: SEED
//     }
// }

// module.exports = config