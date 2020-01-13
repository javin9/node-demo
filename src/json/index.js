const fs = require('fs-extra')
const path = require('path')
const filePath = './src/json/data.json'
const cwd = process.cwd()
const readline = require('readline')

function resolve (filePath) {
  return path.resolve(cwd, filePath)
}

function set (key, value) {
  if (!fs.existsSync(resolve(filePath))) {
    fs.ensureFileSync(resolve(filePath))
  }
  let data = fs.readFileSync(resolve(filePath), { encoding: 'utf8' })
  data = data ? JSON.parse(data) : {}
  data[key] = value
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
  console.log('保存成功');

}

function get (key) {
  if (!fs.existsSync(resolve(filePath))) {
    return undefined;
  }
  const data = fs.readFileSync(resolve(filePath))
  return JSON.parse(data[key])
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', (input) => {
  if (input) {
    console.log("input", input);

    const [op, key, value] = input.split(' ')
    if (op === 'set') {
      set(key, value)
    }
    if (op === 'get') {
      get(key)
    }
  }
})
// save(Date.now().toString(), 1)

