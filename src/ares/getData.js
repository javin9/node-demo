const fs = require('fs');

// 读取 JSON 文件
const data = JSON.parse(
  fs.readFileSync(
    '/Users/liujianwei/Documents/personal_code/node-demo/mock/qingbei.json',
    'utf8',
  ),
);

// 提取 _id 和 name 字段
const result = data.data.list.map((item) => ({
  id: item._id,
  name: item.name,
}));

console.log('result>>>>>>>>', result);
