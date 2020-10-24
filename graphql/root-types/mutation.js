const db = require('../../configs/database-connect')
const _ = require('../../configs/config')
const BookType = require('../types/books')
const AuthorType = require('../types/authors')
const books = db(_.books.name)
const authors = db(_.authors.name)

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')


module.exports = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                books.insert({ name: args.name, genre: args.genre, authorid: args.authorId }).returning("*")
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                authors.insert({ name: args.name, age: args.age, authorid: args.bookId }).returning("*")
            }
        }
    })
})