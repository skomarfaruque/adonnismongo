'use strict'

import axios from 'axios'
import store from '~store'

const ax = axios.create({
  baseURL: `${process.env.baseUrl}/api`
})
if (process.BROWSER_BUILD) {
  ax.defaults.headers.common['Authorization'] = `Bearer ${store.state.authUser}`
}

ax.setBearer = function (token) {
  this.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default ax
