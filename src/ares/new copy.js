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

  // const w_yuqingqing9 = await db.users.find({
  //   userId: 'w_yuqingqing9',
  // });
  // console.log('w_zhangfan3>>>>>>>>', w_yuqingqing9);
  // await db.projects.update(
  //   { _id: projectData._id },
  //   {
  //     $set: {
  //       partner: uniq(projectData.partner.concat(partnerIdList)),
  //     },
  //   },
  // );
  // const result = await db.projects.find({
  //   _id: new ObjectId('67d2a03068f59000495832f6'),
  // });
  // console.log('result>>>>>>>>', result);
  // result 结果如下
  // [
  //   {
  //     _id: new ObjectId('67d2a03068f59000495832f6'),
  //     status: 0,
  //     name: '耸人听闻儿童',
  //     ownerId: 'w_liujianwei6',
  //     deleted: false,
  //     editable: true,
  //     origin: null,
  //     themeGroupId: null,
  //     createdAt: 2025-03-13T09:06:56.766Z,
  //     pagepv: 0,
  //     pageuv: 0,
  //     sharepv: 0,
  //     shareuv: 0,
  //     lastModified: 2025-03-13T09:06:56.766Z,
  //     revisionId: new ObjectId('67d2a03068f59000495832f7'),
  //     revisionData: {
  //       title: '耸人听闻儿童',
  //       layout: 'normal',
  //       clazz: 'project',
  //       width: 375,
  //       height: 679,
  //       userSelect: 'auto',
  //       useData: false,
  //       dataUrl: '',
  //       descUrl: '',
  //       descriptions: [],
  //       pageState: {},
  //       usePreloader: false,
  //       preLoadBackgroundImg: '',
  //       pages: [Array],
  //       editorType: 'project',
  //       componentPlat: 'h5',
  //       miniProgramId: 'gh_de755964442e',
  //       runingStartTime: '2025-03-13T09:06:36.523Z',
  //       runingEndTime: '2099-01-01T00:00:00.763Z'
  //     },
  //     parentId: null,
  //     roleId: null,
  //     config: {},
  //     version: '3.0',
  //     poster: 'https://static0.xesimg.com/platform-fe/gaozhong/editor/common-static/poster.jpg',
  //     userDeptId: new ObjectId('625d0bf51102be269d68d574'),
  //     client: [ 'jzh', 'wx', 'wxmini', 'other' ],
  //     application: null,
  //     tags: null,
  //     partner: [ 'w_wanggang10' ]
  //   }
  // ]

  // 写一段代码 将 w_doujiande20 添加到 partner 中 w_tianyahong  w_liujianwei6
  const templateList = [
    { id: '6756a96d8e044f6d3651d0ce', name: '抽奖乐翻天' },
    { id: '67b5827ad1ec2a6f51b4aeb9', name: '开学季抽奖' },
    { id: '670e3f8dc5ee6d7f360af911', name: '规则' },
    { id: '670e3f84a9853f67365dcc2d', name: '抽奖' },
  ];

  const qingbei = [
    { id: '672cbd768e044f6d3651cf98', name: '云游博物馆' },
    { id: '672c890fa9853f67365dcd13', name: '清北学长学姐说' },
    { id: '672c8560943ca05536335a47', name: '清北学长学姐' },
    { id: '670a4908c5ee6d7f360af8e7', name: '把女儿”宠“进北大' },
    { id: '663edc97419e04553851a758', name: '爱学会学的北大娃如何养成' },
    { id: '663f0e22dc876d896200c0a2', name: '不卷也能进名校' },
    { id: '663ee0d3419e04553851a75e', name: '把女儿宠进北大' },
    { id: '670a4215943ca05536335935', name: '值得效仿的妈妈' },
    { id: '663f628ea58316766206c88f', name: '清北家长' },
    { id: '663ca252dc876d896200c08f', name: '清北家长说列表' },
  ];

  const partnerIdList = ['w_liujianwei6'];
  // 下面代码 封装成一个函数 传入templateList
  async function addPartnerToProject(list, partnerIdList) {
    for (let i = 0; i < list.length; i++) {
      const editorId = list[i].id;

      const projectData = await db.projects.find({
        _id: new ObjectId(editorId),
      });
      console.log('projectData>>>>>>>>', projectData);
      const project = projectData[0];
      if (!project) {
        console.log('project不存在>>>>>>>>', project);
        return;
      }
      await db.projects.update(
        { _id: project._id },
        {
          $set: {
            partner: uniq(project.partner.concat(partnerIdList)),
          },
        },
      );
      const result2 = await db.projects.find({
        _id: new ObjectId(editorId),
      });
      console.log('result2>>>>>>>>', result2);
    }
  }

  await addPartnerToProject(
    [{ id: '672cbd768e044f6d3651cf98', name: '云游博物馆' }],
    partnerIdList,
  );

  // const editorId = '670e3f84a9853f67365dcc2d';
  // const partnerIdList = ['w_liujianwei6'];
  // const projectData = await db.projects.find({
  //   _id: new ObjectId(editorId),
  // });
  // const project = projectData[0];
  // await db.projects.update(
  //   { _id: project._id },
  //   {
  //     $set: {
  //       partner: uniq(project.partner.concat(partnerIdList)),
  //     },
  //   },
  // );
  // const result2 = await db.projects.find({
  //   _id: new ObjectId(editorId),
  // });
  // console.log('result2>>>>>>>>', result2);

  await db.close();
})();
