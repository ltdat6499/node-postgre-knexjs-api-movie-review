const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../configs/database-connect");
const typeDefs = require("./type-def");

class BookQuery {
  //id: number
  static async getById(id) {
    return await db("books")
      .select()
      .where("id", id);
  }
  //ids: Array<number>
  static async getByIds(ids) {
    return await db("books")
      .select()
      .whereIn("id", ids);
  }
  //id: number
  static async getByAuthorId(id) {
    return await db("books")
      .select()
      .where("author_id", id);
  }

  static async getAll() {
    return await db("books").select();
  }
}

class AuthorQuery {
  //id: number
  static async getById(id) {
    return await db("authors")
      .select()
      .where("id", id);
  }
  //ids: Array<number>
  static async getByIds(ids) {
    return await db("authors")
      .select()
      .whereIn("id", ids);
  }
  static async getAll() {
    return await db("authors").select();
  }
}

class Book {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.genre = data.genre;
    this.author_id = data.author_id;
  }

  static async load(ctx, args) {
    const [data] = await BookQuery.getById(args.id);
    if (!data) return null;
    return new Book(data);
  }

  static async loadAll(ctx, args) {
    const data = await BookQuery.getAll();
    const newData = data.map((row) => new Book(row));
    return newData;
  }

  static async loadByAuthorId(ctx, args) {
    const data = await db("books")
      .select()
      .where("author_id", args.id);
    if (!data) return null;
    const newData = data.map((row) => new Book(row));
    return newData;
  }
}

class Author {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.age = data.age;
  }

  static async load(ctx, args) {
    const [data] = await AuthorQuery.getById(args.id);
    if (!data) return null;
    return new Author(data);
  }

  static async loadAll() {
    const data = await AuthorQuery.getAll();
    const newData = data.map((row) => new Author(row));
    return newData;
  }
}

const resolvers = {
  Query: {
    authors: async (_, args, ctx) => Author.loadAll(ctx, args),
    author: async (_, args, ctx) => Author.load(ctx, args),
    books: async (_, args, ctx) => Book.loadAll(ctx, args),
    book: async (_, args, ctx) => Book.load(ctx, args),
  },
  Book: {
    author: async (parent, args, ctx) =>
      Author.load(ctx, { id: parent.author_id }),
  },
  Author: {
    book: async (parent, args, ctx) =>
      Book.loadByAuthorId(ctx, { id: parent.id }),
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
