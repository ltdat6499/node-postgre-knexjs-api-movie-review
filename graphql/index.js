const koaGraphQL = require('koa-graphql')
const Router = require('koa-router')
const router = new Router({ prefix: '/graphql' })
const RootQueryType = require('./root-types/query')
const RootMutationType = require('./root-types/mutation')
const {
    GraphQLSchema
} = require('graphql')

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

router.all('/', koaGraphQL({
    schema: schema,
    graphiql: true
}))

module.exports = router