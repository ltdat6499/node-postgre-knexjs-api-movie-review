const book = `
    type Book implements Node{
        id: ID!
        name: String
        author_id: Int
        genre: String
        author: Author
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
    type Author implements Node {
        id: ID!
        name: String
        age: Int
        book: [Book]
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
        books(first: Int, after: Int): BookConnection
        author(id: ID!): Author
        authors(first: Int, after: Int): AuthorConnection
        node(id: ID!): Node
    }
    `;

module.exports = book + author + query + pageInfo;
