const fs = require('fs')

// const readable = fs.createReadStream('./data/data.txt')
// const writeable = fs.createWriteStream('./data/data_copy.txt')
// readable.pipe(writeable)
// console.log('end')


//取消关闭
const readable = fs.createReadStream('./data/data1.txt', { end: false })
const writeable = fs.createWriteStream('./data/data_copy.txt')

readable.on('end', () => {
  console.log('dddd');

  writeable.end('结束');
  writeable.close()
})

// console.log(process)
readable.pipe(writeable)

setInterval(() => {

}, 3000)
console.log('end')