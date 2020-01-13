const fs = require('fs')
const path = require('path')

const content = fs.readFileSync(path.resolve(__dirname, './os.js'), 'utf8')
console.log(content);