exports.up = async function(knex) {
    await knex.raw(`
          CREATE TABLE excels (
          id serial PRIMARY KEY,
          imgname text,
          img bytea
      )`);
  };
  
  exports.down = async (knex) => {
    await knex.raw(`
      DROP TABLE excels
   `);
  };
  