const axios = require('axios')
let url = "http://localhost:2333/history"
axios.post(url, {})
  .then(res => {
      console.log(res.data)
  })
  .catch(err => {
      console.log(err)
  })