import { createStore } from 'vuex'
const axios = require('axios')
const instance = axios.create({ baseURL: 'http://localhost:3000/api/' })

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    submitSignup: ({ commit }, newUser) => {
      console.log(newUser)
      instance.post('/auth/signup', newUser)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitLogin: ({ commit }, user) => {
      console.log(user)
      instance.post('/auth/login', user)
        .then(function (response) {
          console.log(response + 'connected')
          const res = JSON.parse(response)
          localStorage.setItem('token', res.token)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
