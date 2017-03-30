'use strict'

import axios from 'axios'

const ax = axios.create({
  baseURL: `${process.env.baseUrl}/api`
})

ax.setBearer = function (token) {
  this.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default ax
