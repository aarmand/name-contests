/**create MeType as const to be imported and re-usable in schema.js */

/**import the GraphQL Helper types we are using in this custom 
 * type definition
 */
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');


/**this is what the module will export to schema.js */
module.exports = new GraphQLObjectType({
    name: 'MeType',

    fields: {
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        createdAt: { type: GraphQLString }
    }
});
