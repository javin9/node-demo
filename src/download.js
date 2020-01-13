// (async () => {
//   const download = require('download-git-repo')
//   const ora = require('ora')
//   const spinner = ora('Loading template')
//   spinner.start()
//   download('github:harrypunia/vue-template', "test", {}, (err) => {
//     if (err) {
//       console.log(err);
//       spinner.fail()
//     }
//     console.log(new Date());
//     spinner.succeed()
//   })
// })()

const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const ora = require('ora')
const spinner = ora('loading...')

module.exports = async function (url, destination) {
  spinner.start()
  try {
    await download(url, destination)
  } catch (error) {
    spinner.fail()
  }
  spinner.succeed()
}


