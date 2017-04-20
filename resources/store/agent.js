export const state = {
  list: []
}

export const mutations = {
  SET_AGENTS: function (state, payload) {
    state.list = payload
  }
}

export const actions = {
  async getAgents ({ commit, axios }) {
    let { data } = await axios.get('agents')
    commit('SET_AGENTS', data)
  }
}
