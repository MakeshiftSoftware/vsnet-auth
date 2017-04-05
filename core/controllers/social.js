const co = require('co');

/**
 * Add sent friend request to sender and
 * received friend request to receiver.
 *
 * Also, remove the receiver's id from the sender's
 * blocked list if necessary.
 */
exports.sendFriendRequest = (req, res) => {

}

/**
 * Add an entry to both users' friends array.
 * The entry contains a user id and username.
 *
 * Remove request from sent and received arrays for
 * both users. This is in case both players send a
 * request to each other.
 */
exports.acceptFriendRequest = (req, res) => {

}

/**
 * Remove request from sent and received arrays for
 * both users. This is in case both players send a
 * request to each other.
 *
 * Also, add the user id of the sender to the receiver's
 * blocked list to prevent further requests.
 */
exports.rejectFriendRequest = (req, res) => {

}