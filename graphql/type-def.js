const book = `
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


`;
const author = `
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

    
`;
const pageInfo = `
    type PageInfo {
        hasNextPage: Boolean
        hasPreviousPage: Boolean
        startCursor: Int
        endCursor: Int
    }
`;

const query = `
    type Query {
        book(id: Int): Book
        author(id: Int): Author
    }
    `;

const mutation = `
    type Mutation {
        createBook(name: String!, genre: String, author_id: Int): BookOutput
        createAuthor(name: String!, age: Int): AuthorOutput
    }
`;

module.exports = book + author + query;
