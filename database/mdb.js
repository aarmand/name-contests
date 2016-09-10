/**module for handling calls to mongodb. exports a functions 
 * that take the mPool object and returns an object that has
 * functions as properties. getCounts is our function which then
 * calls a mongodb query and returns the results.
 * .then(userCounts => userCounts[countsField]) says get the
 * countsField property on userCounts only.
 */
module.exports = mPool => {
    return {
        getCounts(user, countsField) {
            return mPool.collection('users')
                .findOne({ userId: user.id })
                .then(userCounts => userCounts[countsField]);
        }
    };
};