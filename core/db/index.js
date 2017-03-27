const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

exports.connect = () => new Promise((resolve, reject) => {
  const url = process.env.LOCAL_DB;

  if (state.db) resolve(state.db);

  MongoClient.connect(url, (err, db) => {
    if (err) reject(err);
    state.db = db;
    resolve(db);
  });
});

exports.get = () => state.db

exports.close = () => new Promise((resolve, reject) => {
  if (!state.db) {
    reject('No connection open');
  }

  state.db.close((err, result) => {
    if (err) {
      reject({message: err.message});
    } else {
      state.db = null;
      state.mode = null;
      resolve(result);
    }
  });
});

exports.getCollections = () => new Promise((resolve, reject) => {
  if (state.db) {
    state.db.listCollections().toArray((err, collections) => {
      if (err) reject(err);
      resolve(collections.map(collection => collection.name));
    });
  }
});