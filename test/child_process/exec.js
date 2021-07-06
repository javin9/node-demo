/*
 * @Desc:
 * @FilePath: /node-demo/test/child_process/exec.js
 * @Author: liujianwei1
 * @Date: 2021-06-27 21:25:20
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */
// const { exec } = require('child_process')
// // const child = spawn("echo $ANSWER ;\n echo $HOME; ", {
// //   stdio: "inherit",
// //   shell: true,
// //   env: { ANSWER: 42 }
// // })


// setInterval(() => {
//   exec('curl https://juejin.cn/post/6978477054366842916', (error, output) => {
//     console.log(output)
//   })
// }, 2000)

setInterval(() => {
  window.open('https://juejin.cn/post/6978477054366842916')
}, 2000)