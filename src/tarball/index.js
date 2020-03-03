const getNpmTarballUrl = require('./getNpmTarballUrl')
const extractTarball = require('./extractTarball');
const zlib = require('zlib');

(async () => {
  try {
    const url = await getNpmTarballUrl('koa-best-validator', 'https://registry.npmjs.org')
    await extractTarball(url)
  } catch (error) {

  }
})()