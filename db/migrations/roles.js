exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE roles (
        id serial PRIMARY KEY,
        user_id VARCHAR ( 100 ) NOT NULL,
        role VARCHAR ( 100 ) NOT NULL
    )`);
};

exports.down = async (knex) => {
    await knex.raw(`
    DROP TABLE roles
 `);
};
