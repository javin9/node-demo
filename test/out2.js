/*
 * @Desc:
 * @FilePath: /node-demo/test/out2.js
 * @Author: liujianwei1
 * @Date: 2021-06-19 17:08:21
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */
const fs = require("fs")
const server = require("http").createServer()

server.on("request", (req, res) => {
  fs.readFile("./big.file", (err, data) => {
    if (err) throw err
    res.end(data)
  })
})

server.listen(8000)