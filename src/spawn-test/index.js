const userHome = require('user-home')
const { spawn, spawnSync } = require('child_process')
console.log(userHome);
//https://blog.csdn.net/u010144805/article/details/80224697


// http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options
//cat a.txt
let sync = spawnSync('cat', ['README.md'])
console.log(sync.stdout.toString());

//ls -al ./
const ls = spawn('ls', ['-l', '-a'])
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});