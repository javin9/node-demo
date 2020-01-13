const os = require('os')
const percent = os.freemem() / os.totalmem()
setInterval(() => {
  console.log(os.freemem() / os.totalmem());
}, 3000)