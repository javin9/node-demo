/*
 * @Name: name
 * @Description: description
 * @Author: liujianwei(liujianwei1213@163.com)
 * @LastEditors  : liujianwei
 * @LastEditTime : 2020-01-12 21:41:49
 * @LastEditContent: 
 */
const fs = require('fs')
const zlib = require('zlib')

//压缩
fs.createReadStream('./data/input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./data/input.txt.gz'))


// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));

console.log("文件解压完成。");