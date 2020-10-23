
exports.up = async (knex) => {
    await knex.raw(`
        CREATE TABLE books (
            id serial PRIMARY KEY,
            name VARCHAR ( 100 ) NOT NULL,
            genre VARCHAR ( 100 ) NOT NULL,
            info VARCHAR ( 100 ) NOT NULL
        )`
    )
};

exports.down = async (knex) => {
    await knex.raw(`DROP TABLE books`)
};
