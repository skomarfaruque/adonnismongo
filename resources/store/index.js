'use strict'

import axios from '~/plugins/axios'

export const state = {
  authUser: null
}

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session) {
      try {
        var token = 'hello'
        commit('SET_USER', token)
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
    })
    .catch((error) => {
      if (error.response.status === 401) {
        throw new Error('Bad credentials')
      }
    })
  },

  logout ({ commit }) {
    return axios.post('/api/logout')
    .then(() => {
      commit('SET_USER', null)
    })
  }

}
