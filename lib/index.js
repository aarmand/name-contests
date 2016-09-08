const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];

/**'new' is a Function constructor. The function body is A string containing
 * the JavaScript statements comprising the function definition. 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function */
const pgPool = new pg.Pool(pgConfig);

/**() after express executes the app server function right then. This is 
 * using express's http server, included with node.'
 */
const app = require('express')();

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');

/**add context object to executor. for { syntax }.
 * see http://exploringjs.com/es6/ch_destructuring.html  */
app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: { pgPool }
}));

/**listen for app on port or fallback port 3000.
 * So process.env.port || 3000 means: whatever is in the
 * environment variable PORT, or 3000 if there's nothing there. PORT, () => 
 * says to connect to port then console.log following string template.
 * http://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
