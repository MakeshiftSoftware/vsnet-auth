const MongoClient = require('mongodb').MongoClient

/**
 * Get database url from environment variables.
 */
const DB_URL = process.env.NODE_ENV === 'production'
  ? process.env.DB_DEV
  : process.env.DB_PROD

/**
 * Initialize state object to contain db instance.
 */
const state = {
  db: null
}

/**
 * Connect to database. If connection is already made,
 * simply reuse the same connection. Otherwise, create
 * a new connection and set the state. Returns a promise.
 */
exports.connect = () => new Promise((resolve, reject) => {
  /**
   * Reuse the connection if it exists.
   */
  if (state.db) resolve(state.db)

  /**
   * Create a new connection to MongoDB.
   */
  MongoClient.connect(LOCAL_DB_URL, (err, db) => {
    if (err) {
      reject(err)
    } else {
      state.db = db
      resolve(db)
    }
  })
})

/**
 * Get database instance.
 */
exports.get = () => state.db

/**
 * Close the database connection.
 */
exports.close = () => new Promise((resolve, reject) => {
  /**
   * If no database instance exists, return error.
   */
  if (!state.db) {
    reject('No connection open')
  }

  /**
   * Close the connection.
   */
  state.db.close((err, result) => {
    if (err) {
      reject({message: err.message})
    } else {
      state.db = null
      resolve(result)
    }
  });
})

/**
 * Get database collections as an array.
 */
exports.getCollections = () => new Promise((resolve, reject) => {
  if (state.db) {
    state.db.listCollections().toArray((err, collections) => {
      if (err) reject(err);
      resolve(collections.map(collection => collection.name))
    })
  }
})
