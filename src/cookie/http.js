const http = require('http')
http.createServer((req, res) => {
  res.setHeader('Set-Cookie', 'usernmae=cupid')
  res.write('Hellow')
  res.end()
}).listen(3000)