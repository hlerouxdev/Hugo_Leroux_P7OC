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
    },
    message: ''
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
    },
    setMessage: function (state, message) {
      state.message = message
    },
    setUser: (state, user) => {
      state.user = user
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
          .then(res => {
            commit('setStatus', '')
            console.log(res.data)
            commit('logUser', res.data)
            console.log('connected :)')
            resolve(res)
          })
          .catch(error => {
            commit('setStatus', 'error_login')
            commit('setMessage', error.message)
            reject(error)
          })
      })
    },
    getUser: ({ commit }) => {
      instance.get('/auth/me')
        .then(res => {
          commit('getUserInfos', res.data)
        })
        .catch(error => {
          commit('setStatus', 'error_login')
          commit('setMessage', error.message)
        })
    },
    changeUserInfos: ({ commit }, data) => {
      instance.put(`/auth/user/${data.user}`, data.form)
        .then(res => {
          commit('getUserInfos', data.form)
          commit('setMessage', res.message)
        })
        .catch(error => {
          commit('setMessage', error.message)
        })
    },
    changeUserPassword: ({ commit }, data) => {
      instance.put(`/auth/user/${data.user}/password`, data.form)
        .then(res => {
          commit('setMessage', res.message)
        })
        .catch(error => {
          commit('setMessage', error.message)
        })
    },
    deleteUser: ({ commit }, userId) => {
      return instance.delete(`/auth/user/${userId}`)
        .then(res => {
          commit('setUser', {
            userId: -1,
            token: ''
          })
          commit('getUserInfos', {
            firstName: '',
            lastName: '',
            email: '',
            adress: '',
            department: '',
            profilePicture: ''
          })
          localStorage.clear()
        })
        .catch(error => {
          commit('setMessage', error.message)
        })
    }
  },
  modules: {
  }
})
