// Import type helpers from graphql-js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

// const pgdb = require('../database/pgdb');
/** import UserType */
const UserType = require('./types/user');

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        user: {
            type: UserType,
            description: 'The current user identified by an api-key',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (obj, args, { loaders }) => {
                return loaders.usersByApiKeys.load(args.key);
            }
        }
    }
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType
        // mutation: ...
});

module.exports = ncSchema;