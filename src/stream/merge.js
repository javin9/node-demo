const fs = require('fs')
const path = require('path')


//取消关闭
const writeable = fs.createWriteStream(path.resolve(__dirname, './mergedata.txt'))

const allFiles = fs.readdirSync(path.resolve(__dirname, './data'))
console.log(allFiles);

function merge(allFiles, writeable) {
  console.log(allFiles);
  if (allFiles.length === 0) {
    writeable.end('关闭写入流')
    return
  }
  // console.log(allFiles.shift());
  const readable = fs.createReadStream(path.resolve(__dirname, './data', allFiles.shift()))
  readable.pipe(writeable, { end: false })
  readable.on('end', () => {
    merge(allFiles, writeable)
  })
  readable.on('error', () => {
    writeable.close()
  })
}

merge(allFiles, writeable)