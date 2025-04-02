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

function uniq(arr) {
  return [...new Set(arr)];
}

const { ObjectId, createMongoWrapper } = require('./pro-mongo');
// 创建实例
const db = createMongoWrapper(
  'mongodb://xfront_rw:PTvahKdj9qVK2eR_@dds-2zef8bdde51371a41.mongodb.rds.aliyuncs.com:3717,dds-2zef8bdde51371a42.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-87077105&authSource=admin',
);

(async () => {
  // 连接数据库
  await db.connect('ares');
  // 查询所有用户
  // const allUsers = await db.users.find();
  // console.log('All users:', allUsers);
  // const w_yuqingqing9 = await db.users.find({
  //   userId: 'w_yuqingqing9',
  // });
  // console.log('w_zhangfan3>>>>>>>>', w_yuqingqing9);
  // const w_zhangfan3 = await db.users.find({ _id: '67c1e1cc58d51bc968ac73d4' });
  // console.log('w_zhangfan3>>>>>>>>', w_zhangfan3);

  // const user = await db.users.findCursor().sort().limit(3).toArray();
  // console.log('user>>>>>>>>', user);

  // const count = await db.users.count({ userId: 'w_zhangfan3' });
  // console.log('count>>>>>>>>', count);
  // const results = await db.users.distinct('userId');
  // console.log('results>>>>>>>>', results);

  // const result = await db.users.update(
  //   { userId: 'w_liujianwei6' },
  //   {
  //     $set: {
  //       role: '超级管理员',
  //     },
  //   },
  //   {
  //     upsert: true, // 没有就创建
  //     multi: false,
  //   },
  // );

  // console.log('result>>>>>>>>', result);

  // const projects = await db.projects.findCursor().sort().limit(3).toArray();
  // console.log('projects>>>>>>>>', projects);
  // 67c1e1cc58d51bc968ac73d4
  // 67c1e35205a417328d9c8388
  // const userInstance = {
  //   userId: 'w_zhangfan99',
  //   department: '希望学-小学学部-学科部-S抖音直售号B1',
  //   firstLoginDate: new Date(),
  //   lastLoginDate: new Date(),
  //   role: '普通用户',
  //   roleIds: [],
  //   userDeptId: new ObjectId('625d0bf51102be269d68d574'),
  //   workcode: 'W006046',
  //   components: { OpenMiniProgram: '0.0.5', BackLastPage: '0.0.1' },
  // };
  // const result = await db.users.insert(userInstance);
  // console.log('result>>>>>>>>', result);

  // const result = await db.users.remove({
  //   _id: new ObjectId('67d151d4336b9030c2bfbff5'),
  // });
  // console.log('result>>>>>>>>', result);

  await db.close();
})();
