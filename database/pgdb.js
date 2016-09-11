/**We used pgdb as a function so we are exporting it as a function.
 * The pgdb function expects a pgPool arg and returns and object. In The
 * returned object, we define this modules api. The getUser function 
 * recieves the users apiKey and returns the users object from the psql db.
 * #note - reading from the postgres db is an ayscn operation. GraphQL resolvers
 * can handle that if you return the result with a promise that resolves to
 * the expected object. The postgres node driver we are using returns promises
 * for all its operations by default. SO, this module is accessing pgPool
 * which is using the pg node driver(async). see npm pg driver here:
 * (https://www.npmjs.com/package/pg) In the return statement we ask
 * the driver to use the getUser method with the passed in key. Where did getUser
 * come from? we defined it as a function and passed in the api key at the same time, this
 * returns the users object.
 * Then added the callback statement which is a pqsl select user statement/query on pqsl pool. the templates tags
 * surround the query. see Passing Postgres queries in node here:
 *  (https://github.com/brianc/node-postgres/wiki/Prepared-Statements)
 * This call will return a promise that resolves to an object that has information
 * about the rows returned by the sql statement, this is more information than we need.
 * We only want the info we asked for so we are going to modify the return statement
 * to return the first line since we know that is the line with the information we want.
 * The .then statement say return one row or zero rows for bad keys.
 */
const { orderedFor } = require('../lib/util');

module.exports = pgPool => {

    return {
        getUsersByIds(userIds) {
            return pgPool.query(`
            select * from users
            where id = ANY($1)
            `, [userIds]).then(res => {
                return orderedFor(res.rows, userIds, 'id', true);
            });
        },

        getUsersByApiKeys(apiKeys) {
            return pgPool.query(`
            select * from users
            where api_key = ANY($1)
            `, [apiKeys]).then(res => {
                return orderedFor(res.rows, apiKeys, 'apiKey', true);
            });
        },

        getContestsForUserIds(userIds) {
            return pgPool.query(`
            select * from contests
            where created_by = ANY($1)
            `, [userIds]).then(res => {
                return orderedFor(res.rows, userIds, 'createdBy', false);
            });
        },

        getNamesForContestIds(contestIds) {
            return pgPool.query(`
            select * from names
            where contest_id = ANY($1)
            `, [contestIds]).then(res => {
                return orderedFor(res.rows, contestIds, 'contestId', false);
            });
        }
    };
};