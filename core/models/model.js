const db = require('../db');
const ObjectId = require('mongodb').ObjectId;

/**
 * Base model class with helper functions for
 * common MongoDB operations. All methods return
 * a promise.
 */
class Model {
  /**
   * Get mongo collection using collection name.
   */
  static getCollection() {
    return db.get().collection(this.collection);
  }

  /**
   * Create unique indexes for unique fields.
   * No effect if indexes already exist.
   */
  static index() {
    let createIndex = (field) => new Promise((resolve, reject) => {
      console.log(this.modelName + ': creating unique index for field \'' + field + '\'');
      const q = {[field] : 1};
      
      this.getCollection().createIndex(q, {unique: true}, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });

    const actions = this.uniqueFields.map(createIndex);
    return Promise.all(actions);
  }

  /**
   * Find one entry using query.
   *
   * @param {Object} query - The query object
   */
  static findOne(query) {
    return new Promise((resolve, reject) => {
      this.getCollection().findOne(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  /**
   * Find one entry by id
   *
   * @param {String} id - The object id of the entry
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      this.getCollection().findOne({ _id: ObjectId(id) }, (err, result) => {
        err ? reject(err) : resolve(result);
      })
    });
  }

  /**
   * Create an object
   *
   * @param {Object} object - The object to create
   */
  static create(object) {
    return new Promise((resolve, reject) => {
      this.getCollection().insertOne(object, (err, result) => {
        err ? reject(err) : resolve(object);
      });
    });
  }
}

/**
* Expose the class
*/
module.exports = Model;