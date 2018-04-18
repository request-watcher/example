const R = require('ramda')
const axios = require('axios')
const Watcher = require('request-watcher')
const axiosWatcher = require('request-watcher-axios')

Watcher.use(axiosWatcher(axios))
Watcher.global.username = 'lisiur'

const jsonDataUrl = 'http://localhost:2333/return-json?a=1&b=好'

for (let i of [1,2,3]) {
  axios.post(jsonDataUrl, {index: i})
    .then(res => {
      console.log('success')
    })
    .catch(err => {
      console.log('fail', err)
    })
}

// logger
const formatLogger = { title: 'title', content: 'content'}
const { emitLog } = Watcher()
emitLog(formatLogger)

// Shortcut
Watcher.logger('content')
const log = {
  status: 200,
  data: [
    {
      name: 'lisiur',
      age: 22
    }
  ]
}
Watcher.logger(log)