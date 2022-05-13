import { getUser } from '@/api/user'

const state = {
  token: '',
  name: '',
  username: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUser().then(async response => {
        const { id, nick, user_name } = response.data

        commit('SET_NAME', nick)
        commit('SET_AVATAR', '')
        commit('SET_USERNAME', user_name)
        commit('SET_TOKEN', id)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_USERNAME', '')
      commit('SET_TOKEN', '')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
