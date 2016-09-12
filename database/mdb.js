/**module for handling calls to mongodb. exports a functions 
 * that take the mPool object and returns an object that has
 * functions as properties. getCounts is our function which then
 * calls a mongodb query and returns the results.
 * .then(userCounts => userCounts[countsField]) says get the
 * countsField property on userCounts only.
 * *******
 * Convert to user DataLoader by using getUsersbyIds style functions
 * we created with DataLoader
 */
const { orderedFor } = require('../lib/util');

module.exports = mPool => {
    return {
        getUsersByIds(userIds) {
            return mPool.collection('users')
                .find({ userId: { $in: userIds } })
                .toArray()
                .then(rows => {
                    return orderedFor(rows, userIds, 'userId', true);
                });
        }
    };
};
// module.exports = mPool => {
//     return {
//         get(user, countsField) {
//             return mPool.collection('users')
//                 .findOne({ userId: user.id })
//                 .then(userCounts => userCounts[countsField]);
//         }
//     };
// };