var pmongo = require('@k9/promised-mongo');

(async () => {
  var db = pmongo(
    'mongodb://k9_fe:iaPn*3iFxXQHSyGF@dds-2ze63803286e82e41.mongodb.rds.aliyuncs.com:3717/ares?rs_name=mgset-72641846',
  );

  console.log('db>>>>>>>>', db);
  const data = await db.users.find();
  console.log('data>>>>>>>>', JSON.stringify(data));
})();
