const request = require('request')
const progress = require('request-progress')
const tar = require('tar')
const path = require('path')
const fs = require('fs-extra')

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const allFiles = [];
    const allWriteStream = [];
    const directoryCollector = [];

    progress(request({ url }))
      .on('progress', (state) => {
        console.log(`percent=${state.percent} \n`);
      })
      .on('error', (err) => {
        console.log(`err=${err}`);
        reject(error)
      })
      // .pipe(zlib.unzip())
      .pipe(tar.x())
      .on('end', () => {
        console.log('end');
        Promise.all(allWriteStream)
          .then(() => resolve(allFiles))
          .catch((error) => {
            reject(error);
          });
      })
      .on('entry', (entry) => {
        const realPath = entry.path.replace(/^package\//, '');
        let filename = path.basename(realPath);
        const destPath = path.join(__dirname, 'package', path.dirname(realPath), filename);

        const needCreateDir = path.dirname(destPath);
        if (!directoryCollector.includes(needCreateDir)) {
          directoryCollector.push(needCreateDir);
          fs.ensureDirSync(path.dirname(destPath))
        }

        allFiles.push(destPath);
        const writeStream = new Promise((streamResolve) => {
          entry
            .pipe(fs.createWriteStream(destPath))
            .on('finish', () => streamResolve());
        });
        allWriteStream.push(writeStream);
      })
  })
}