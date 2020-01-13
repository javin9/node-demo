(async () => {
  const Sequelize = require('sequelize')
  console.log(typeof sequelize);
  const instance = new Sequelize('krup', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    //时区
    timezone: '+08:00',
    define: {
      //设置为true，会自动创建create_time update_time 
      timestamps: true,
      // delte_time
      paranoid: true,
      // 命名风格的更改
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'update_at',
      deletedAt: 'delete_at'
    }
  })

  //模型
  const User = instance.define('userinformation', {
    firtName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER
    }
  })

  instance
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log(err);
    })

  await User.sync()
  //增
  // User.create({
  //   firtName: Date.now().toString(),
  //   lastName: Date.now().toString(),
  //   age: 20
  // })

  //改
  await User.update(
    {
      firtName: "Feilong"
    },
    {
      where: {
        id: 2
      }
    }
  )
  //查
  // User.findAll().then((user) => {
  //   console.log(JSON.stringify(user, '', '\t'));
  // })

  //
  const Op = Sequelize.Op
  // User.findAll({
  //   attributes: {
  //     exclude: ['created_at']
  //   },
  //   where: {
  //     id: {
  //       [Op.gte]: 3
  //     }
  //   }
  // }).then((user) => {
  //   console.log(JSON.stringify(user, '', '\t'));
  // })

})()