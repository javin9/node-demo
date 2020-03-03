const request = require('request')
const progress = require('request-progress')
const zlib = require('zlib')
const tar = require('tar')
const path = require('path')
const fs = require('fs-extra')
const unzip = require('unzip')

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    console.log('开始extract');

    progress(request({ url }))
      .on('progress', (state) => {
        console.log(`percent=${state.percent} \n`);
      })
      .on('error', (err) => {
        console.log(`err=${err}`);
        reject(error)
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('end', () => {
        console.log('end')
      })
      .pipe(fs.createWriteStream(path.resolve(__dirname, 'a.gz')))
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        console.log(entry);
      })
    // .pipe(zlib.Unzip())
    // .pipe(tar.Parse())
    // .on('entry', (entry) => {
    //   console.log('entrye');

    //   const realPath = entry.path.replace(/^package\//, '');

    //   let filename = path.basename(realPath);

    //   const destPath = path.join(__dirname, path.dirname(realPath), filename);

    //   const needCreateDir = path.dirname(destPath);
    //   if (!directoryCollector.includes(needCreateDir)) {
    //     directoryCollector.push(needCreateDir);
    //     mkdirp.sync(path.dirname(destPath));
    //   }

    //   allFiles.push(destPath);
    //   const writeStream = new Promise((streamResolve) => {
    //     entry
    //       .pipe(fs.createWriteStream(destPath))
    //       .on('finish', () => streamResolve());
    //   });
    //   allWriteStream.push(writeStream);
    // })

  })
}