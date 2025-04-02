const { QuickMongoClient, QuickMongo } = require('quick-mongo-super');
const connectionURI =
  'mongodb://xfront_rw:PTvahKdj9qVK2eR_@dds-2zef8bdde51371a41.mongodb.rds.aliyuncs.com:3717/admin';
// const connectionURI =
//   'mongodb://xfront_rw:PTvahKdj9qVK2eR_@dds-2zef8bdde51371a41.mongodb.rds.aliyuncs.com:3717,dds-2zef8bdde51371a42.mongodb.rds.aliyuncs.com:3717/ares?replicaSet=mgset-87077105&authSource=admin';
const quickMongoClient = new QuickMongoClient(connectionURI);

// const mongo = new QuickMongo(quickMongoClient, {
//   name: 'ares',
// });
// console.log('mongo>>>>>>>>', mongo);

// mongo.find({ userId: 'w_caoxiuzhu' }).then((data) => {
//   console.log('data>>>>>>>>', data);
// });

(async () => {
  await quickMongoClient.connect();
  console.log('quickMongoClient>>>>>>>>');
  const quickMongo = new QuickMongo(quickMongoClient, {
    name: 'ares', //'databaseName',
    collectionName: 'users', // (optional)
  });
  const res = quickMongo.collectionName;
  quickMongo.console.log('res>>>>>>>>', res);
  const sss = quickMongo.keys();
  console.log('sss>>>>>>>>', sss);
})();
