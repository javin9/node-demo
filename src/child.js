const child_process = require('child_process')
const process = require('process')
const fork = []
for (let index = 0; index < 1; index++) {
  const workerProcess = child_process.fork('./index.js', [3001 + index])
  fork.push(workerProcess)
  workerProcess.on('exit', (code) => {
    console.log('推出进程', code);
  })
}
process.on('SIGTERM', () => {
  console.log('kill');

  fork.forEach((item) => {
    item.kill()
  })
  process.exit()
})

require('./test.js')