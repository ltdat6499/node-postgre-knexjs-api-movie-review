const graphql = require("graphql");
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

type BookConnection {
  edges: [BookEdge]
  totalCount: Int
  pageInfo: PageInfo
}

type BookEdge {
  node: Book
  cursor: Int
}

type PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor: Int
  endCursor: Int
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
  bookPage(first: Int, after: Int): BookConnection
  author(id: Int): Author
  authors: [Author]
}

type Mutation {
  createBook(name: String!, genre: String, author_id: Int): BookOutput
  createAuthor(name: String!, age: Int): AuthorOutput
}
`;

async function pagnation(table, first, after) {
  const [{ count }] = await db(table).count("*");
  let fullPage = []
  let isExist, index = after, counter = 0;
  do{
    index++
    isExist = db(table)
    .select()
    .where('id', index).first();
    if(isExist){
      fullPage.push(isExist)
      counter++
    }
  }
  while(after < count && counter < first);
    const edges = fullPage.map((item) => {
      return {
        node: item,
      };
    });
  const totalCount = count;
  const pageInfo = {
    hasNextPage: first + after < count ? 1 : 0,
    hasPreviousPage: after > 1 ? 1 : 0,
    startCursor: after + 1,
    endCursor: after + first,
  };
  return {
    edges,
    totalCount,
    pageInfo,
  };
}

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
    bookPage: async (_, { first, after }) => pagnation('books', first, after),
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
    async author(parent) {
      return await authors()
        .select()
        .where("id", parent.author_id)
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
  BookConnection: {},
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
