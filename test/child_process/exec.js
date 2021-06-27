/*
 * @Desc:
 * @FilePath: /node-demo/test/child_process/exec.js
 * @Author: liujianwei1
 * @Date: 2021-06-27 21:25:20
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */
const { spawn } = require('child_process')
const child = spawn("echo $ANSWER ;\n echo $HOME; ", {
  stdio: "inherit",
  shell: true,
  env: { ANSWER: 42 }
})