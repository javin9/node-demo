const webshot = require('webshot');
const fs = require('fs-extra');
const path = require('path')

const fileDirPath = path.resolve(__dirname, 'assets')
const resource = path.join(fileDirPath, 'zuoyebang.png')
fs.ensureDirSync(fileDirPath)
const readStream = webshot('https://www.zuoyebang.com');

const writeStream = fs.createWriteStream(resource);

readStream.pipe(writeStream)
// renderStream.on('data', function (data) {
//   file.write(data.toString('binary'), 'binary');
// });

