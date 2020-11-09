exports.up = async (knex) => {
  await knex.raw(`
      CREATE TABLE google_excel (
      id serial PRIMARY KEY,
      colection_id text,
      published_at text,
      product text,
      title text,
      link text
  )`);
};

exports.down = async (knex) => {
  await knex.raw(`
      DROP TABLE google_excel
   `);
};
