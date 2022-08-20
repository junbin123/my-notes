// https://docs.cloudbase.net/cli-v1/hosting
const params = {
  command: 'tcb',
  list: ['hosting', 'deploy', 'build', '-e', 'likeday-f4b2b']
}
spawnPromise(params).then(res => {
})


/**
 * spawn Promise化
 * @param {String} command eg: npm
 * @param {Array} list eg: ['run', 'build']
 * @returns {Promise}
 */
function spawnPromise({ command = '', list = [] }) {
  const { spawn } = require('child_process')
  const promise = new Promise((resolve, reject) => {
    const first = command === 'npm' && /^win/.test(process.platform) ? 'npm.cmd' : command
    const s = spawn(first, list)
    s.stdout.on('data', (data) => {
      console.log(data + '')
    })
    s.stderr.on('data', (data) => {
      console.log(data + '')
    })
    s.on('close', (data) => {
      if (data === 0) {
        resolve(data)
      }
      reject(data)
    })
    s.on('error', (err) => {
      reject(err)
    })
  })
  return promise
}