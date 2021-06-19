/*
 * @Desc:
 * @FilePath: /node-demo/test/input.js
 * @Author: liujianwei1
 * @Date: 2021-06-19 16:19:40
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */
const fs = require("fs")
const file = fs.createWriteStream("./big.file")

for (let i = 0; i <= 1e6; i++) {
  file.write(
    "陵阳人朱尔旦，字小明，性情豪放。但他生性迟钝，读书虽然很勤苦，却一直没有成名。一天，朱尔旦跟几个文友一块喝酒。有人跟他开玩笑说：“你以豪放闻名，如能在深夜去十王殿，把左廊下那个判官背了来，我们大家就做东请你喝酒。”原来，陵阳有座十王殿，殿里供奉着的鬼神像都是木头雕成的，妆饰得栩栩如生。\n "
  )
}

file.end()