const spawn = require('cross-spawn')
// 同步的用法：cat README.md
let catSync = spawn.sync('cat', ['README.md'])
console.log(catSync.stdout.toString());

//异步的用法：
let cat = spawn('cat', ['README.md'])
cat.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})
