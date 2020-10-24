const {
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLScalarType,
    GraphQLError
  } = require('graphql')
  
  export const ProjectInputType = new GraphQLInputObjectType({
    name: 'ProjectInputType',
    description: 'Project type',
    fields: () => ({
      name: { type: new GraphQLNonNull(GraphQLString)},
      age: { type: new GraphQLNonNull(GraphQLInt)},
      booksId: { type: new GraphQLNonNull(GraphQLString)},
    })
  });