'use strict'
import axios from 'axios'
import cookie from '~/plugins/cookie'

export const state = {
  authUser: null,
  role: '',
  cartItem: '',
  permissions: [],
  heading: {
    title: '',
    subtitle: ''
  }
}

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user.token
    state.role = user.role
    state.permissions = user.permissions
  },
  SET_HEAD: function (state, heading) {
    state.heading.title = heading[0]
    state.heading.subtitle = heading[1]
  },
  SET_CART_ITEM: function (state, cartItem) {
    state.cartItem = cartItem
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req) {
      try {
        const userStr = cookie.get('backend-app', req.headers.cookie)
        const user = JSON.parse(userStr)
        if (user.token && user.token.length > 0) {
          commit('SET_USER', user)
        }
      } catch (e) {
        return false
      }
    }
  },
  login ({ commit }, { email, password }) {
    return axios.post('api/user/login', {
      email,
      password
    })
    .then((res) => {
      commit('SET_USER', res.data)
      const userStr = JSON.stringify(res.data)
      cookie.set('backend-app', userStr, 1)
    })
    .catch((error) => {
      if (error.response.status === 401) {
        throw new Error('Bad credentials')
      }
    })
  },

  logout ({ commit }) {
    commit('SET_USER', { token: null, permissions: [] })
    cookie.set('backend-app', '{}')
  },
  forgotpassword ({ commit }, { email }) {
    return axios.post('api/user/forgotpassword', {
      email
    })
    .then((res) => {
      return true
    })
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error('Not found!')
      }
    })
  }

}
