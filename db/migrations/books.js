exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE books (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      genre VARCHAR(100),
      author_id INT,
      updated_at VARCHAR(10)
    );

    CREATE FUNCTION set_update_date()
    RETURNS TRIGGER AS 
    $$ 
    BEGIN 
      NEW.updated_at := (SELECT TO_CHAR(NOW(), 'DD-MM-YYYY'));
      RETURN NEW;
    END;
    $$ 
    LANGUAGE PLPGSQL;

    CREATE TRIGGER set_update_date 
    BEFORE INSERT OR UPDATE 
    ON books 
    FOR EACH ROW EXECUTE PROCEDURE set_update_date();
    `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE books;
    DROP FUNCTION set_update_date();
    `);
};
