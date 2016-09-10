/**contestType that is used in MeType for list of 
 * contests created by that user.
 */
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');

const pgdb = require('../../database/pgdb');
const NameType = require('./name');
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
        names: {
            type: new GraphQLList(NameType),
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getNames(obj);
            }
        }
    }
});