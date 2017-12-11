const R = require('ramda')
const axios = require('axios')
const watcher = require('request-watcher')

watcher.use(require('request-watcher-axios'))
watcher.global.appname = "test-app"
watcher.global.save = false

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
const { emitLog } = watcher()
emitLog(formatLogger)

// Shortcut
watcher.logger('content')
const logger = {
  status: 200,
  data: [
    {
      name: 'lisiur',
      age: 22
    }
  ]
}
watcher.logger(logger)