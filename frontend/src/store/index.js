import { createStore } from 'vuex'
import 'es6-promise/auto'
import moment from 'moment'
import router from '@/router'
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
      isAdmin: false,
      token: localStorage.getItem('token') ? localStorage.getItem('token').split(' ')[1] : ''
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
    userToDisplay: {
      firstName: '',
      lastName: '',
      bio: '',
      email: '',
      adress: '',
      department: '',
      profilePicture: ''
    },
    successMessage: '',
    errorMessage: '',
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
      router.push({ path: '/feed' })
    },
    getUserInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    setSuccessMessage: function (state, message) {
      state.successMessage = message
    },
    setErrorMessage: function (state, message) {
      state.errorMessage = message
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
          commit('setErrorMessage', error.message)
        })
    },
    checkToken: ({ commit }, token) => {
      console.log('begin action')
      instance.get('/auth/me', {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          const tokenString = token.replace('Bearer ', '')
          commit('logUser', {
            userId: res.data.id,
            token: tokenString,
            isAdmin: res.data.isAdmin
          })
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    changeProfilePicture: ({ commit }, data) => {
      const formData = new FormData()
      formData.append('image', data.image)
      instance.put(`/auth/user/${data.user}/profile-picture`, formData, config)
        .then(res => {
          commit('getUserInfos', data.form)
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    changeUserInfos: ({ commit }, data) => {
      instance.put(`/auth/user/${data.user}`, data.form)
        .then(res => {
          commit('getUserInfos', data.form)
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    changeUserPassword: ({ commit }, data) => {
      instance.put(`/auth/user/${data.user}/password`, data.form)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
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
          commit('setErrorMessage', error.message)
        })
    },
    createPost: ({ commit }, data) => {
      instance.post('/posts/', data)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
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
          commit('setAllPosts', posts.reverse())
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
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
          commit('setErrorMessage', error.message)
        })
    },
    deletePost: ({ commit }, id) => {
      instance.delete(`/posts/${id}`)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    commentPost: ({ commit }, { postId, content }) => {
      console.log(postId)
      instance.post(`/posts/${postId}`, { content })
        .then(res => {
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    }
  },
  modules: {
  }
})
