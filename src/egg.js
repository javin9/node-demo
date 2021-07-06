/*
 * @Desc: 
 * @FilePath: /node-demo/src/egg.js
 * @Author: liujianwei1
 * @Date: 2021-06-14 19:29:55
 * @LastEditors: liujianwei1
 * @Reference Desc: 
 */
const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleTimeString()
  res.status(200).send(`Server time is ${localTime}`)
})

app.get("*", (req, res) => {
  req.status(404)
})

app.listen(PORT, () => {
  console.log('Server is running')
})