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
      setTimeout(() => { state.successMessage = '' }, 3000)
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
    refresh: ({ state, dispatch }) => {
      console.log(router.currentRoute)
      const route = router.currentRoute._value.name
      if (route === 'my-profile') {
        dispatch('getUserPosts', state.user.userId)
      }
      if (route === 'feed') {
        dispatch('getAllPosts')
      }
    },
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
    changeProfilePicture: ({ commit, dispatch }, { user, image }) => {
      const formData = new FormData()
      formData.append('image', image)
      instance.put(`/auth/user/${user}/profile-picture`, formData, config)
        .then(res => {
          dispatch('getUser')
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    changeUserInfos: ({ commit }, { user, form }) => {
      instance.put(`/auth/user/${user}`, form)
        .then(res => {
          commit('getUserInfos', user)
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    changeUserPassword: ({ commit }, { user, form }) => {
      instance.put(`/auth/user/${user}/password`, form)
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
    createPost: ({ commit, dispatch }, { content, image }) => {
      const formData = new FormData()
      if (image) {
        formData.append('image', image)
      }
      formData.append('content', content)
      instance.post('/posts/', formData, config)
        .then(res => {
          commit('setSuccessMessage', res.data.message, config)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    getAllPosts: ({ commit, state }) => {
      return instance.get('/posts/') // va chercher tous les posts dans le back
        .then(res => {
          const posts = res.data
          res.data.forEach(post => { // boucle dans le tableau des posts
            post.liked = false
            post.Likes.forEach(like => {
              if (like.UserId === state.user.userId) {
                post.liked = true
              }
            })
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
    getUserPosts: ({ commit, state }, id) => {
      return instance.get(`/posts/user/${id}`)
        .then(res => {
          const posts = res.data
          posts.forEach(post => {
            post.liked = false
            post.Likes.forEach(like => {
              if (like.UserId === state.user.userId) {
                post.liked = true
              }
            })
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
    modifyPost: ({ commit, dispatch }, { postId, content, image }) => {
      const formData = new FormData()
      if (image) {
        formData.append('image', image)
      }
      formData.append('content', content)
      instance.put('/posts/' + postId, formData, config)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    deletePost: ({ commit, dispatch }, id) => {
      instance.delete(`/posts/${id}`)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    commentPost: ({ commit, dispatch }, { postId, content }) => {
      console.log(postId)
      instance.post(`/posts/${postId}/comment`, { content })
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    }
  },
  modules: {
  }
})
