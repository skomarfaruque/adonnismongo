'use strict'

import axios from 'axios'

const ax = axios.create({
  baseURL: `/api`
})

ax.setBearer = function (token) {
  this.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  }, function (err) {
    return Promise.reject(err)
  })
}

export default ax
