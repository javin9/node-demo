/*
 * @Desc: 
 * @FilePath: /node-demo/test/w.js
 * @Author: liujianwei1
 * @Date: 2021-06-20 01:24:28
 * @LastEditors: liujianwei1
 * @Reference Desc: 
 */
const { Transform } = require("stream")

const upperCaseTr = new Transform({
  transform (chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

process.stdin.pipe(upperCaseTr).pipe(process.stdout)