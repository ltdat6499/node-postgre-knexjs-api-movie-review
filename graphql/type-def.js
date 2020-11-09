const book = `
    type Book {
        id: ID!
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
        id: ID!
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

    interface Node {
        id: ID!
      }
`;
const author = `
    type Author {
        id: ID!
        name: String
        age: Int
        book: [Book]
    }
    
    input AuthorInput {
        name: String
        age: Int
    }
    
    type AuthorOutput {
        id: ID!
        name: String
        age: Int
    }

    type AuthorConnection {
        edges: [AuthorEdge]
        totalCount: Int
        pageInfo: PageInfo
    }
    type AuthorEdge {
        node: Author
        cursor: Int
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
        book(id: ID!): Book
        books(first: Int, after: String): BookConnection
        author(id: ID!): Author
        authors(first: Int, after: String): AuthorConnection
        node(id: ID!): Node
    }
    `;

module.exports = book + author + query + pageInfo;
