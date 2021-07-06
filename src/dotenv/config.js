/*
 * @Desc:
 * @FilePath: /node-demo/src/dotenv/config.js
 * @Author: liujianwei1
 * @Date: 2021-07-06 15:50:31
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */

const path = require('path')
const cwd = process.cwd()

module.exports = {
  dev: path.resolve(cwd, ".env.development"),
  test: path.resolve(cwd, ".env.test"),
  prod: path.resolve(cwd, ".env.production")
}