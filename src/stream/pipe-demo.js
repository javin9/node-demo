/*
 * @Name: name
 * @Description: description
 * @Author: liujianwei(liujianwei1213@163.com)
 * @LastEditors  : liujianwei
 * @LastEditTime : 2020-01-12 21:38:05
 * @LastEditContent: 
 */
const fs = require('fs')
const path = require('path')

const read = fs.createReadStream(path.resolve(__dirname, './data/input.txt'))
const write = fs.createWriteStream(path.resolve(__dirname, './data/output.txt'))
read.pipe(write)
