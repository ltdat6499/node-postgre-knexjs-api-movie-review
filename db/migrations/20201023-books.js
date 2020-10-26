/*
101 	mm/dd/yyyy
102 	yyyy.mm.dd
103 	dd/mm/yyyy
104 	dd.mm.yyyy
105 	dd-mm-yyyy
110 	mm-dd-yyyy
111 	yyyy/mm/dd
106 	dd mon yyyy
107 	Mon dd, yyyy
*/
exports.up = async (knex) => {
  await knex.raw(`

    CREATE TABLE books (
        id serial PRIMARY KEY,
        name VARCHAR (100) NOT NULL,
        genre VARCHAR (100) NOT NULL,
        authorId INT,updated_at VARCHAR(10));

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
