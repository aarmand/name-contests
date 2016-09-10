/**contestType that is used in MeType for list of 
 * contests created by that user.
 */
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString
} = require('graphql');

/**import ContestStatusType from its path to make it 
 * accessible in this module
 */
const ContestStatusType = require('./contest-status');

module.exports = new GraphQLObjectType({
    name: 'ContestType',

    fields: {
        id: { type: GraphQLID },
        code: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: { type: new GraphQLNonNull(ContestStatusType) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
    }
});