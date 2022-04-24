import { createStore } from 'vuex'
import 'es6-promise/auto'
import moment from 'moment'
import router from '@/router'
// import { commentPost } from './actions/comments'

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
    allPosts: [],
    messages: [],
    messagesUsers: []
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
    updateUserInfos: (state, updatedUser) => {
      state.userInfos = Object.assign(state.userInfos, updatedUser)
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
    addMessageUser: (state, user) => {
      state.messagesUsers.push(user)
    },
    clearMessagesUsers: (state) => {
      state.messagesUsers = []
    }
  },
  actions: {
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
          commit('setSuccessMessage', res.data.message)
          dispatch('getUser')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    changeUserInfos: ({ commit }, { user, form }) => {
      instance.put(`/auth/user/${user}`, form)
        .then(res => {
          commit('updateUserInfos', form)
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
      instance.post(`/posts/comment/${postId}`, { content })
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    modifyComment: ({ commit, dispatch }, { commentId, content }) => {
      console.log(commentId, content)
      instance.put('/posts/comment/' + commentId, { content })
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    deleteComment: ({ commit, dispatch }, commentId) => {
      instance.delete('/posts/comment/' + commentId)
        .then(res => {
          commit('setSuccessMessage', res.data.message)
          dispatch('refresh')
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    getMessages: ({ commit, state, dispatch }) => {
      instance.get('/messages/')
        .then(res => {
          const messagesUsers = []
          res.data.forEach(message => {
            if (!messagesUsers.includes(message.senderId) && message.senderId !== state.user.userId) {
              dispatch('getMessageUserInfos', message.senderId)
            }
            if (!messagesUsers.includes(message.receiverId) && message.receiverId !== state.user.userId) {
              dispatch('getMessageUserInfos', message.receiverId)
            }
          })
          commit('setMessages', res.data)
        })
        .catch(error => {
          commit('setErrorMessage', error.message)
        })
    },
    getMessageUserInfos: ({ commit }, userId) => {
      instance.get('/auth/user/' + userId)
        .then(res => {
          commit('addMessageUser', res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
