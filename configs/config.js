require('dotenv').config()

module.exports = {
    db: {
        client: 'pg',
        user: 'docker',
        password: 'docker',
        database: 'todo',
        host: '127.0.0.1',
        port: 5432
    },
    jwtKey: 'ThisIsASecretKey',
    server: {
        port: 3000,
        migration: '/db/migrations/',
        seed: '/db/seeds/'
    },
    books: {
        name: 'books'
    },
    authors: {
        name: 'authors'
    },
    users: {
        name: 'users'
    },
    todo: {
        name: 'todos'
    }

}