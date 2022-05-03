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
    // Connected user Basic infos
    user: {
      userId: -1,
      isAdmin: false,
      token: localStorage.getItem('token') ? localStorage.getItem('token').split(' ')[1] : ''
    },
    // Connected User infos
    userInfos: {
      firstName: '',
      lastName: '',
      bio: '',
      email: '',
      adress: '',
      department: '',
      profilePicture: ''
    },
    // User being looked at
    otherUser: {
      firstName: '',
      lastName: '',
      bio: '',
      email: '',
      adress: '',
      department: '',
      profilePicture: ''
    },
    // Messages alerts
    successMessage: '',
    errorMessage: '',
    // Misc data to display
    allPosts: [],
    messages: [],
    allUsers: []
  },
  getters: {
  },
  mutations: {
    setStatus: (state, status) => {
      state.status = status
    },
    logUser: (state, user) => {
      instance.defaults.headers.common.Authorization = `Bearer ${user.token}`
      localStorage.setItem('token', `Bearer ${user.token}`)
      state.user = user
      router.push({ path: '/feed' })
    },
    getUserInfos: (state, userInfos) => {
      state.userInfos = userInfos
    },
    setOtherUser: (state, user) => {
      state.otherUser = user
    },
    updateUserInfos: (state, data) => {
      if (state.user.userId === data.user) {
        state.userInfos = Object.assign(state.userInfos, data.form)
      } else {
        state.otherUser = Object.assign(state.otherUser, data.form)
      }
    },
    setSuccessMessage: (state, message) => {
      state.successMessage = message
      setTimeout(() => { state.successMessage = '' }, 3000)
    },
    setErrorMessage: (state, message) => {
      state.errorMessage = message
    },
    setUser: (state, user) => {
      state.user = user
    },
    setAllPosts: (state, posts) => {
      state.allPosts = posts
    },
    setMessages: (state, messages) => {
      state.messages = messages
    },
    setAllUsers: (state, users) => {
      state.allUsers = users
    },
    clearMessages: (state) => {
      state.messages = []
      state.allUsers = []
    }
  },
  actions: {
    // ------------------------------------------------ Signup/Login ------------------------------------------------
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
    checkToken: ({ commit }, token) => {
      return instance.get('/auth/me', {
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
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    // ------------------------------------------------ User infos ------------------------------------------------
    getUser: ({ commit }) => {
      return instance.get('/auth/me')
        .then(res => {
          commit('getUserInfos', res.data)
        })
        .catch(error => {
          commit('setStatus', 'error_login')
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    getOtherUser: ({ commit }, userId) => {
      return instance.get('auth/user/' + userId)
        .then(res => {
          commit('setOtherUser', res.data)
        })
        .catch(error => {
          commit('setStatus', 'error_login')
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    getAllUsers: ({ commit, state }) => {
      return instance.get('/auth/')
        .then(users => {
          users.data.forEach(user => {
            user.messaged = false
            state.messages.forEach(message => {
              if (message.senderId === user.id || message.receiverid === user.id) {
                user.messaged = true
              }
            })
          })
          commit('setAllUsers', users.data)
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    changeProfilePicture: ({ commit, dispatch }, { user, image }) => {
      const formData = new FormData()
      formData.append('image', image)
      return instance.put(`/auth/user/${user}/profile-picture`, formData, config)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    changeUserInfos: ({ commit }, { user, form }) => {
      return instance.put('/auth/user/' + user, form)
        .then(res => {
          commit('updateUserInfos', { user, form })
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    changeUserPassword: ({ commit }, { user, form }) => {
      return instance.put(`/auth/user/${user}/password`, form)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    deleteUser: ({ commit, state }, userId) => {
      return instance.delete('/auth/user/' + userId)
        .then(res => {
          if (userId === state.user.userId) { // logout user if they delete their own account
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
          }
          commit('setSuccessMessage', res.data.message)
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    // ------------------------------------------------ Posts ------------------------------------------------
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
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    getAllPosts: ({ commit, dispatch }) => {
      return instance.get('/posts/') // va chercher tous les posts dans le back
        .then(res => {
          const posts = res.data
          dispatch('formatPosts', posts)
          commit('setAllPosts', posts.reverse())
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    getUserPosts: ({ commit, dispatch }, id) => {
      return instance.get(`/posts/user/${id}`)
        .then(res => {
          dispatch('formatPosts', res.data)
          commit('setAllPosts', res.data.reverse())
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    formatPosts: ({ state }, posts) => {
      return posts.forEach(post => {
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
        post.Comments.forEach(comment => {
          comment.createdAt = moment(comment.createdAt).format('Do MMMM YYYY [à] HH:mm')
        })
      })
    },
    refresh: ({ state, dispatch }) => {
      const route = router.currentRoute._value.name
      if (route === 'my-profile') {
        dispatch('getUserPosts', state.user.userId)
      }
      if (route === 'user-profile') {
        dispatch('getOtherUser', state.otherUser.id)
        dispatch('getUserPosts', state.otherUser.id)
      }
      if (route === 'feed') {
        dispatch('getAllPosts')
      }
    },
    modifyPost: ({ commit, dispatch }, { postId, content, image }) => {
      const formData = new FormData()
      if (image) {
        formData.append('image', image)
      }
      formData.append('content', content)
      return instance.put('/posts/' + postId, formData, config)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    deletePost: ({ commit, dispatch }, id) => {
      return instance.delete(`/posts/${id}`)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    likePost: ({ commit, dispatch }, { postId, like }) => {
      return instance.post(`/posts/${postId}/like`, { like })
        .then(() => {
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error)
        })
    },
    // ------------------------------------------------ Comments ------------------------------------------------
    commentPost: ({ commit, dispatch }, { postId, content }) => {
      return instance.post(`/posts/comment/${postId}`, { content })
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    modifyComment: ({ commit, dispatch }, { commentId, content }) => {
      return instance.put('/posts/comment/' + commentId, { content })
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    deleteComment: ({ commit, dispatch }, commentId) => {
      return instance.delete('/posts/comment/' + commentId)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    // ------------------------------------------------ Messages ------------------------------------------------
    getMessages: ({ commit }) => {
      return instance.get('/messages/')
        .then(res => {
          res.data.forEach(message => {
            message.createdAt = moment(message.updatedAt).format('[posté le] Do MMMM YYYY [à] HH:mm')
          })
          commit('setMessages', res.data)
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    },
    sendMessage: ({ commit, dispatch }, { userId, content }) => {
      return instance.post('/messages/' + userId, { content })
        .then(() => {
          dispatch('getMessages')
        })
        .catch(error => {
          commit('setErrorMessage', error.response.data.message ? error.response.data.message : error.response.data)
        })
    }
  },
  modules: {
  }
})
