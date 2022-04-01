import { createStore } from 'vuex'
import 'es6-promise/auto'
// import userActions from './actions/user.js'
// import { reject, resolve } from 'core-js/fn/promise'
const axios = require('axios')
const instance = axios.create({ baseURL: 'http://localhost:3000/api/' })

export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      token: ''
    },
    userInfos: {
      firstName: '',
      lastName: '',
      email: '',
      adress: '',
      department: '',
      profilePicture: ''
    }
  },
  getters: {
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common.Authorization = `Bearer ${user.token}`
      localStorage.setItem('token', `Bearer ${user.token}`)
      state.user = user
    },
    getUserInfos: function (state, userInfos) {
      state.userInfos = userInfos
    }
  },
  actions: {
    // ...userActions
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
  },
  modules: {
  }
})
