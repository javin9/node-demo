const express = require('express');
const mysql = require('mysql');

// 创建连接到MySQL的连接对象
const connection = mysql.createConnection({
  host: 'localhost', // 数据库服务器地址
  user: 'root', // 你的MySQL用户名
  port: 3306,
  password: '123456', // 你的MySQL密码
  database: 'test_flask', // 你想要连接的数据库名
});

// 连接到数据库
connection.connect((error) => {
  if (error) {
    return console.error('错误: ' + error.message);
  }
  console.log('成功连接到数据库');
});

const app = express();

// 创建一个简单的路由来测试数据库连接
app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    res.send('数据库返回的结果是: ' + results[0].solution);
  });
});

// 监听3000端口
app.listen(3000, () => {
  console.log('应用正在监听3000端口');
});
