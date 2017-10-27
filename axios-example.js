const R = require('ramda')
const axios = require('axios')
const watcher = require('request-watcher')

watcher.global.appname = "test-app"
require('request-watcher-axios')(axios, watcher)

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