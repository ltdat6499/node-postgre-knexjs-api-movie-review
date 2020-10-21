
exports.up = async function (knex) {
    await knex.raw(`
    CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR ( 100 ) NOT NULL,
    password VARCHAR ( 100 ) NOT NULL)`
    )

};

exports.down = async function (knex) {
    await knex.raw(`
    DROP TABLE users
`)
};
