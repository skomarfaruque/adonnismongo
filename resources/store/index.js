'use strict'

import axios from '~/plugins/axios'
import cookie from '~/plugins/cookie'

export const state = {
  authUser: null,
  permissions: [],
  heading: {
    title: '',
    subtitle: ''
  }
}

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user.token
    state.permissions = user.permissions
  },
  SET_HEAD: function (state, heading) {
    state.heading.title = heading[0]
    state.heading.subtitle = heading[1]
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req) {
      try {
        const token = cookie.get('backend-app', req.headers.cookie)
        const permissions = cookie.get('backend-app-per', req.headers.cookie)
        if (token && token.length > 0) {
          commit('SET_USER', { token, permissions })
        }
      } catch (e) {
        return false
      }
    }
  },
  login ({ commit }, { email, password }) {
    return axios.post('user/login', {
      email,
      password
    })
    .then((res) => {
      commit('SET_USER', res.data)
      cookie.set('backend-app', res.data.token, 1)
      cookie.set('backend-app-per', res.data.permissions, 1)
    })
    .catch((error) => {
      if (error.response.status === 401) {
        throw new Error('Bad credentials')
      }
    })
  },

  logout ({ commit }) {
    commit('SET_USER', { token: null, permissions: [] })
    cookie.set('backend-app', '')
    cookie.set('backend-app-per', '')
  },
  forgotpassword ({ commit }, { email }) {
    return axios.post('user/forgotpassword', {
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
