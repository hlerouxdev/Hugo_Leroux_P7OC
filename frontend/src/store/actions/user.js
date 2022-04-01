const axios = require('axios')
const instance = axios.create({ baseURL: 'http://localhost:3000/api/' })

const userActions = {
  submitSignup: ({ commit }, newUser) => {
    return new Promise((resolve, reject) => {
      instance.post('/auth/signup', newUser)
        .then(function (res) {
          resolve(res)
        })
        .catch(function (error) {
          commit('setStatus', 'error_signup')
          reject(error)
        })
    })
  },
  submitLogin: ({ commit }, user) => {
    commit('setStatus', 'loading')
    return new Promise((resolve, reject) => {
      instance.post('/auth/login', user)
        .then(function (res) {
          console.log(res)
          commit('setStatus', '')
          commit('logUser', res.data)
          console.log('connected :)')
          resolve(res)
        })
        .catch(function (error) {
          commit('setStatus', 'error_login')
          reject(error)
        })
    })
  },
  getUser: ({ commit }) => {
    instance.get('/auth/me')
      .then(res => {
        console.log(res)
        commit('getUserInfos', res.data)
      })
      .catch(error => {
        commit('setStatus', 'error_login')
        console.log(error)
      })
  }
}

module.export = userActions
