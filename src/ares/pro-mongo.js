const { MongoClient, ObjectId } = require('mongodb');

class MongoPromiseWrapper {
  constructor(uri, options = {}) {
    this.uri = uri;
    this.options = options;
    this.client = null;
    this.db = null;

    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target) return target[prop];
        if (!target.db) {
          throw new Error('Database not connected. Call connect() first.');
        }
        return new CollectionWrapper(target.db.collection(prop));
      },
    });
  }

  async connect(dbName) {
    if (!this.client) {
      this.client = new MongoClient(this.uri, {
        ...this.options,
        useUnifiedTopology: true,
      });
      await this.client.connect();
      this.db = this.client.db(dbName);
    }
    return this;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

class CollectionWrapper {
  constructor(collection) {
    this.collection = collection;
  }

  async insert(doc) {
    const result = await this.collection.insertOne(doc);
    const insertedId = result.insertedId;
    // 根据 insertedId 查询插入的文档
    return this.collection.findOne({ _id: insertedId });
  }

  findOne(query = {}) {
    return this.collection.findOne(query);
  }

  // 修改 find 方法，返回 Cursor
  findCursor(query = {}) {
    const cursor = this.collection.find(query);

    // 返回代理对象
    const findProxy = new Proxy(cursor, {
      // eslint-disable-next-line no-unused-vars
      get(target, prop, receiver) {
        if (prop in target) {
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        }
        return undefined;
      },
      then(resolve, reject) {
        return cursor.toArray().then(resolve, reject);
      },
    });

    return findProxy;
  }

  // 修改 find 方法，返回 Cursor
  find(query = {}) {
    return this.collection.find(query).toArray();
  }

  // 修复 update 方法，避免重复包装 $set
  update(query, update, options = {}) {
    // 检查 update 是否已包含操作符（如 $set、$inc 等）
    const hasOperator = Object.keys(update).some((key) => key.startsWith('$'));
    const updateDoc = hasOperator ? update : { $set: update };
    return this.collection.updateOne(query, updateDoc, options);
  }

  remove(query) {
    return this.collection.deleteOne(query);
  }

  count(query = {}) {
    return this.collection.countDocuments(query);
  }

  distinct(field, query = {}) {
    return this.collection.distinct(field, query);
  }

  aggregateCursor(...pipeline) {
    return this.collection.aggregate(pipeline).toArray();
  }

  async save(doc) {
    if (doc._id) {
      const result = await this.collection.replaceOne({ _id: doc._id }, doc, {
        upsert: true,
      });
      return {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        upsertedId: result.upsertedId || doc._id,
      };
    } else {
      const result = await this.collection.insertOne(doc);
      return {
        insertedId: result.insertedId,
      };
    }
  }

  findAndModify({
    query = {},
    sort,
    update,
    remove,
    new: returnNew = false,
    upsert = false,
    fields,
  } = {}) {
    const options = {
      upsert,
      returnDocument: returnNew ? 'after' : 'before',
    };
    if (sort) options.sort = sort;
    if (fields) options.projection = fields;

    if (remove) {
      return this.collection.findOneAndDelete(query, options);
    } else if (update) {
      return this.collection.findOneAndUpdate(query, update, options);
    } else {
      throw new Error(
        'Either update or remove must be specified in findAndModify',
      );
    }
  }
}

module.exports = {
  createMongoWrapper: (uri, options) => new MongoPromiseWrapper(uri, options),
  ObjectId,
};
