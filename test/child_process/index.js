/*
 * @Desc: 
 * @FilePath: /node-demo/test/child_process/index.js
 * @Author: liujianwei1
 * @Date: 2021-06-27 15:42:08
 * @LastEditors: liujianwei1
 * @Reference Desc: 
 */
const { spawn } = require('child_process')
const child = spawn('pwd')

child.on("exit", (code, signal) => {
  console.log(
    "子进程退出：" + `code ${code} and signal ${signal}`
  )
})

child.stdout.on("data", data => {
  console.log(`child stdout:\n${data}`)
})

child.stderr.on("data", data => {
  console.error(`child stderr:\n${data}`)
})