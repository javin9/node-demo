/*
 * @Desc:
 * @FilePath: /node-demo/test/child_process/child.js
 * @Author: liujianwei1
 * @Date: 2021-06-27 21:41:32
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */
process.on("message", msg => {
  console.log("Message from parent:", msg)
})

let counter = 0

setInterval(() => {
  process.send({ counter: counter++ })
}, 1000)