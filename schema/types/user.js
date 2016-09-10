/**create UserType as const to be imported and re-usable in schema.js */

/**import the GraphQL Helper types we are using in this custom 
 * type definition
 */
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const mdb = require('../../database/mdb');
const pgdb = require('../../database/pgdb');
const ContestType = require('./contest');
/** in contestsCount field: resolve return stmt is direct call on mongodb. getCounts obj is this user,
 * and the field we want of the db is contestsCount. Because
 * the contestCount field name we want is the same as the fieldname
 * we can read it by adding a forth arg to resolve statement
 * and reusing it in getCounts. fieldname refers to the name key
 * on this field ( contestCount )
 */

/**this is what the module will export to schema.js */
module.exports = new GraphQLObjectType({
    name: 'UserType',

    fields: {
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        fullName: {
            type: GraphQLString,
            resolve: obj => `${obj.firstName} ${obj.lastName}`
        },
        createdAt: { type: GraphQLString },
        contests: {
            type: new GraphQLList(ContestType),
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getContests(obj);
            }
        },

        contestsCount: {
            type: GraphQLInt,
            resolve(obj, args, { mPool }, { fieldName }) {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(obj, args, { mPool }, { fieldName }) {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(obj, args, { mPool }, { fieldName }) {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        }
    }
});