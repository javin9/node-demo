const crypto = require('crypto')

const hash = (type, str) => crypto.createHash(type).update(str).digest('hex')
const md5 = (str) => hash('md5', str)
const sha1 = (str) => hash('sha1', str)

const str = '1123424sfwersfsadf11'
console.log(md5(str))
console.log(sha1(str))