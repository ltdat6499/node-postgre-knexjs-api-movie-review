
exports.up = async (knex) => {
    await knex.raw(`
        CREATE TABLE authors (
        id serial PRIMARY KEY,
        name VARCHAR ( 100 ) NOT NULL,
        age INT NOT NULL DEFAULT 1)`
    )
};

exports.down = async (knex) => {
    await knex.raw(`
        DROP TABLE authors
    `)
};
