/**
 * 模拟从npm地址，下载tarball，解tarball
 */
const request = require('request-promise-native')
const semver = require('semver')
const ora = require('ora')
//request-promise-native 依赖 request
const spinner = ora('Loading')

module.exports = (name, registry, version) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${registry}/${name}`
      spinner.start('')
      const body = await request({
        url,
        json: true,
      });

      //验证版本
      if (!semver.valid(version)) {
        version = body['dist-tags'].latest;
      }

      if (semver.valid(version) && body.versions && body.versions[version] && body.versions[version].dist) {
        const tarballUrl = body.versions[version].dist.tarball
        console.log();
        console.log(tarballUrl);
        spinner.succeed()
        resolve(tarballUrl)
      } else {
        reject(new Error(`${name}@${version} 尚未发布`))
      }
    } catch (error) {
      reject(new Error(`${name}@${version} 尚未发布`))
    }
  })
}

