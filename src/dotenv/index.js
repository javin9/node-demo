/*
 * @Desc:
 * @FilePath: /node-demo/src/dotenv/index.js
 * @Author: liujianwei1
 * @Date: 2021-07-06 14:20:19
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */

const envConfig = require('./config')
const dotenv = require('dotenv')

console.log(envConfig[process.env.CURRENT_ENV])

// const result = dotenv.config({ path: envConfig[process.env.CURRENT_ENV] }).parsed
// console.log(result)
dotenv.config({ path: envConfig[process.env.CURRENT_ENV] })
console.log(process.env)

