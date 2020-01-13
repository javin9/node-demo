/*
 * @Copyright: Copyright (c) 2019 Zybang, All rights reserved
 * @Name: name
 * @Description: description
 * @Author: liujianwei(liujianwei@zuoyebang.com)
 * @LastEditors  : liujianwei
 * @LastEditTime : 2020-01-12 21:34:16
 * @LastEditContent: 初始化文件
 */
const fs = require('fs')
const path = require('path')

//创建读流
const readStream = fs.createReadStream(path.resolve(__dirname, './data/data.txt'))

//监听事件 data,end,error,finish
let data = ''
readStream.on('data', (chunk) => {
  data = data + chunk
})
readStream.on('end', () => {
  console.log(data);
})

//写入流
const writeStream = fs.createWriteStream(path.resolve(__dirname, './data/input.txt'))
//写入数据
writeStream.write('Stream，测试程序', 'utf8')
//编辑文件末位
writeStream.end()

writeStream.on('finish', () => {
  console.log('写入完成');
})
