import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      auth: false
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.userId >= 1) {
        next({ name: 'feed' })
      } else {
        next()
      }
    }
  },
  {
    path: '/feed',
    name: 'feed',
    component: Feed,
    meta: {
      auth: true
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.userId < 1) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    component: Profile,
    meta: {
      auth: true
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.userId < 1) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: {
      auth: true
    }
  }
]

//   const token = localStorage.getItem('token')
//   if (token && store.state.user.userId < 1) {
//     console.log('test')
//     store.dispatch('checkToken', token)
//       .then(() => {
//         next({ name: 'feed' })
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes
})

export default router
