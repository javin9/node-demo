const cluster = require('cluster')
const os = require('os')
const cpusLength = os.cpus().length

const process = require('process')
let workerList = {}

if (cluster.isMaster) {
  //祝进程分支，开启与cpu相同的进程
  for (let index = 0; index < cpusLength; index++) {
    const worker = cluster.fork()
    workerList[worker.pid] = worker
  }

  //异常重启
  cluster.on('exit', (worker) => {
    worker = cluster.fork()
    workerList[worker.pid] = worker
  })
} else {

  //工作进程
  const app = require('./index')
  app.use(async (ctx, next) => {
    console.log(`workerID=${cluster.worker.id};workerPID=${cluster.worker.pid}`)
  })
  app.listen(3000)
}

//终止进程
process.on("SIGTERM", () => {
  for (const pid in workerList) {
    if (object.hasOwnProperty(pid)) {
      // const worker = workerList[pid];
      process.kill(pid)
    }
    process.exit(0)
  }
})