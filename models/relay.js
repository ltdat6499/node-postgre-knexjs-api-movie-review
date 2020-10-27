const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const constant = require("../configs/config");

const books = () => db(constant.books.name);
const authors = () => db(constant.authors.name);

const typeDefs = `
    type Book {
        id: Int!
        name: String
        author_id: Int
        genre: String
        author: Author
    }
    
    input BookInput {
        name: String
        genre: String
        author_id: Int
    }
    
    type BookOutput {
        id: Int!
        name: String
        genre: String
        author_id: Int
    }

    type Author {
        id: Int!
        name: String
        age: Int
        book: [Book]
    }
    
    input AuthorInput {
        name: String
        age: Int
    }
    
    type AuthorOutput {
        id: Int!
        name: String
        age: Int
    }

    type Query {
        book(id: Int): Book
        books: [Book]
        author(id: Int): Author
        authors: [Author]
    }

    type Mutation {
        createBook(name: String!, genre: String, author_id: Int): BookOutput
        createAuthor(name: String!, age: Int): AuthorOutput
    }
`;

const resolvers = {
  Query: {
    author: async (_, { id }) =>
      await authors()
        .select()
        .where({ id })
        .first(),
    authors: async () =>
      await authors()
        .select()
        .orderBy("id", "asc"),
    book: async (_, { id }) =>
      await books()
        .select()
        .where({ id })
        .first(),
    books: async () =>
      await books()
        .select()
        .orderBy("id", "asc"),
  },
  Mutation: {
    createAuthor: async (_, { name, age }) => {
      const [result] = await authors()
        .insert({ name, age })
        .returning("*");
      return result;
    },
    createBook: async (_, { name, genre, author_id }) => {
      const [result] = await books()
        .insert({ name, genre, author_id })
        .returning("*");
      return result;
    },
  },
  Book: {
    async author(book) {
      return await authors()
        .select()
        .where("id", book.author_id)
        .first();
    },
  },
  Author: {
    async book(author) {
      return await books()
        .select()
        .where({ author_id: author.id })
        .orderBy("id", "asc");
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
