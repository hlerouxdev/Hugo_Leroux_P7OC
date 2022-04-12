import { createStore } from 'vuex'
import 'es6-promise/auto'
import moment from 'moment'
// import userActions from './actions/user.js'
// import { reject, resolve } from 'core-js/fn/promise'
const axios = require('axios')
const instance = axios.create({ baseURL: 'http://localhost:3000/api/' })
const config = {
  header: {
    'Content-Type': 'multipart/form-data'
  }
}

moment.locale('fr')

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
      bio: '',
      email: '',
      adress: '',
      department: '',
      profilePicture: ''
    },
    message: '',
    allPosts: []
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
    },
    setAllPosts: (state, posts) => {
      state.allPosts = posts
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
            commit('logUser', res.data)
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
    changeProfilePicture: ({ commit }, data) => {
      const formData = new FormData()
      formData.append('image', data.image)
      console.log(data.image, formData)
      instance.put(`/auth/user/${data.user}/profile-picture`, formData, config)
        .then(res => {
          return commit('setMessage', res.message)
        })
        .catch(error => {
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
    },
    createPost: (data) => {
      instance.post('/posts/', data)
    },
    getAllPosts: ({ commit }) => {
      instance.get('/posts/') // va chercher tous les posts dans le back
        .then(res => {
          const posts = res.data
          res.data.forEach(post => { // boucle dans le tableau des posts
            if (post.createdAt !== post.updatedAt) {
              post.createdAt = moment(post.updatedAt).format('[posté le] Do MMMM YYYY [à] HH:mm')
            } else {
              post.createdAt = moment(post.createdAt).format('[posté le] Do MMMM YYYY [à] HH:mm')
            }
          })
          console.log(posts)
          commit('setAllPosts', posts.reverse())
        })
        .catch(error => {
          console.log(error)
        })
    },
    getMyPosts: ({ commit }, id) => {
      instance.get(`/posts/user/${id}`)
        .then(res => {
          const posts = res.data
          posts.forEach(post => {
            if (post.createdAt !== post.updatedAt) {
              post.createdAt = moment(post.updatedAt).format('[posté le] Do MMMM YYYY [à] HH:mm')
            } else {
              post.createdAt = moment(post.createdAt).format('[posté le] Do MMMM YYYY [à] HH:mm')
            }
          })
          commit('setAllPosts', posts.reverse())
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
