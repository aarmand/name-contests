const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const DataLoader = require('dataloader');

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const pgdb = require('../database/pgdb')(pgPool);
const { orderedFor } = require('../lib/util');
const mdb = require('../database/mdb');
const app = require('express')();

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');

const { MongoClient, Logger } = require('mongodb');

/**add assert to throw errors where we use 'err' */
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

/**use connect method on MongoClient with err, mPool cb. 
 * To make this pool available to all the resolvers,
 * move our endpoint functions (app.use & app.listen) inside the callback.
 * Thn we make mPool availabe by passing to our endpoint the way we did for pgPool 
 */
MongoClient.connect(mConfig.url, (err, mPool) => {
    /** use assert library to tells us if we have an error. If there is an err
     * assert will tell us.
     */
    assert.equal(err, null);


    Logger.setLevel('debug');
    Logger.filter('class', ['Server']);

    /**add context object to executor. for { syntax }.
     * see http://exploringjs.com/es6/ch_destructuring.html  */
    app.use('/graphql', (req, res) => {
        const loaders = {
            usersByIds: new DataLoader(pgdb.getUsersByIds),
            usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
            namesForContestIds: new DataLoader(pgdb.getNamesForContestIds),
            contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds),
            mdb: {
                usersByIds: new DataLoader(mdb.getUsersByIds)
            }
        };
        graphqlHTTP({
            schema: ncSchema,
            graphiql: true,
            context: { pgPool, mPool, loaders }
        })(req, res);
    });

    /**listen for app on port or fallback port 3000.
     * So process.env.port || 3000 means: whatever is in the
     * environment variable PORT, or 3000 if there's nothing there. PORT, () => 
     * says to connect to port then console.log following string template.
     * http://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js */
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})