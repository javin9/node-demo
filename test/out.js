/*
 * @Desc:
 * @FilePath: /node-demo/test/out.js
 * @Author: liujianwei1
 * @Date: 2021-06-19 16:02:30
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */


const fs = require("fs")
const server = require("http").createServer()

server.on("request", (req, res) => {
  const src = fs.createReadStream("./big.file")
  src.pipe(res)
})

server.listen(8000)