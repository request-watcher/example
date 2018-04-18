const R = require('ramda')
const axios = require('axios')
const Watcher = require('request-watcher')

// these config just need to be defined once
axios.interceptors.request.use(function (config) {

  // generate the emit pair, 
  // and use config to send emitRes to axios.interceptors.response's callback
  const { emitReq, emitRes } = Watcher()
  config.__emitRes__ = emitRes

  // generate the emitReq params
  let { headers, method, url, data } = config
  headers = R.isEmpty(headers[method]) ? headers.common : headers[method]

  // send request to request-watcher-server
  emitReq({ headers, method, url, params: data })

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // generate the emitRes params
  const { status, headers, data } = response

  // send response to request-watcher-server
  response.config.__emitRes__({ status, headers, data })

  return response
}, function (error) {
  return Promise.reject(error)
})

// and then just act like normal 
const jsonDataUrl = 'http://localhost:2333/return-json?a=1&b=好'

axios.post(jsonDataUrl, {foo: 'bar'})
  .then(res => {
    console.log('success')
  })
  .catch(err => {
    console.log('fail', err)
  })