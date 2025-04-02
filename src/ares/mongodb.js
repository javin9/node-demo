const { MongoClient } = require('mongodb');
const uri =
  'mongodb://xfront_rw:PTvahKdj9qVK2eR_@dds-2zef8bdde51371a41.mongodb.rds.aliyuncs.com:3717,dds-2zef8bdde51371a42.mongodb.rds.aliyuncs.com:3717/ares?replicaSet=mgset-87077105&authSource=admin';

async function run() {
  // 创建客户端
  const client = new MongoClient(uri);

  try {
    console.log('成功连接到数据库');

    // // 获取数据库和集合
    const db = client.db('ares');

    // const allUsers = await db.collection('users').find().limit(1).toArray();
    // console.log('所有用户:', allUsers);
    // const users = db.collection('users');
    const result = await db.users.update(
      { userId: 'w_liujianwei6' },
      {
        $set: {
          role: '超级管理员',
        },
      },
      {
        upsert: true, // 没有就创建
        multi: false,
      },
    );

    console.log('result>>>>>>>>', result);

    // // // 示例 1: 查询所有文档
    // const allUsers = await users.find().toArray();
    // console.log('所有用户:', allUsers);

    // // 示例 2: 按条件查询 (例如 name 为 "Alice")
    // const aliceUsers = await users.find({ name: 'Alice' }).toArray();
    // console.log('名为 Alice 的用户:', aliceUsers);

    // // 示例 3: 查询单个文档
    // const singleUser = await users.findOne({ age: 25 });
    // console.log('年龄为 25 的用户:', singleUser);

    // // 示例 4: 限制返回字段
    // const limitedUsers = await users
    //   .find(
    //     { age: { $gte: 18 } },
    //     { projection: { name: 1, email: 1, _id: 0 } },
    //   )
    //   .toArray();
    // console.log('年龄 >= 18 的用户 (只返回 name 和 email):', limitedUsers);
  } catch (err) {
    console.error('查询失败:', err);
  } finally {
    // 关闭连接
    await client.close();
    console.log('连接已关闭');
  }
}

// 运行
run().catch(console.dir);
