

const { spawn } = require("child_process")

const child = spawn("wc")

process.stdin.pipe(child.stdin)

child.stdout.on("data", data => {
  console.log(`child stdout:\n${data}`)
})

process.stdin.on('end', function () {
  process.stdout.write('end')
})