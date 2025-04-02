// var pmongo = require('@k9/promised-mongo'); //.compatible();

// (async () => {
//   var db = pmongo(
//     'mongodb://xfront_rw:PTvahKdj9qVK2eR_@dds-2zef8bdde51371a41.mongodb.rds.aliyuncs.com:3717,dds-2zef8bdde51371a42.mongodb.rds.aliyuncs.com:3717/ares?replicaSet=mgset-87077105&authSource=admin&rs_name=mgset-87077105',
//     { authSource: 'admin', replicaSet: 'mgset-87077105' },
//   );
//   console.log('db>>>>>>>>', db);
//   const data = await db.users.find().limit(1);
//   console.log('data>>>>>>>>', JSON.stringify(data));
// })();

const createMongoWrapper = require('./index');
// 创建实例
const db = createMongoWrapper(
  'mongodb://xfront_rw:PTvahKdj9qVK2eR_@dds-2zef8bdde51371a41.mongodb.rds.aliyuncs.com:3717,dds-2zef8bdde51371a42.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-87077105&authSource=admin&rs_name=mgset-87077105',
);

(async () => {
  // 连接数据库
  await db.connect('ares');
  // 查询所有用户
  const allUsers = await db.users.find();
  console.log('All users:', allUsers);
})();
