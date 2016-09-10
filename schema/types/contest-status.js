/**ContestStatusType that is used in MeType for list of 
 * possible status's for each contest. */
const {
    // GraphQLObjectType,
    // GraphQLNonNull,
    // GraphQLID,
    // GraphQLString,
    GraphQLEnumType
} = require('graphql');

module.exports = new GraphQLEnumType({
    name: 'ContestStatusType',

    values: {
        DRAFT: { value: 'draft' },
        PUBLISHED: { value: 'published' },
        ARCHIVED: { value: 'archived' }
    },
});