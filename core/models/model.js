const db = require('../db');
const ObjectId = require('mongodb').ObjectId;

class Model {
  static json() {
  }

  static getCollection() {
    return db.get().collection(this.collection);
  }

  static index() {
    let createIndex = (field) => new Promise((resolve, reject) => {
      console.log(this.modelName + ': creating unique index for field \'' + field + '\'');
      let q = {[field] : 1};
      this.getCollection().createIndex(q, {unique: true}, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });

    const actions = this.uniqueFields.map(createIndex);
    return Promise.all(actions);
  }

  static findOne(query) {
    return new Promise((resolve, reject) => {
      this.getCollection().findOne(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      this.getCollection().findOne({ _id: ObjectId(id) }, (err, result) => {
        err ? reject(err) : resolve(result);
      })
    });
  }

  static create(object) {
    return new Promise((resolve, reject) => {
      this.getCollection().insertOne(object, (err, result) => {
        if (err) return reject(err);
        resolve(result);
        err ? reject(err) : resolve(object);
      });
    });
  }
}

module.exports = Model;