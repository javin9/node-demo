/*
 * @Desc: 
 * @FilePath: /node-demo/test/child_process/parent.js
 * @Author: liujianwei1
 * @Date: 2021-06-27 21:41:05
 * @LastEditors: liujianwei1
 * @Reference Desc: 
 */

const { fork } = require("child_process")

const forked = fork("child.js")

forked.on("message", msg => {
  console.log("Message from child", msg)
})

forked.send({ hello: "world" })