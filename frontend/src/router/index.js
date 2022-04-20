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
    component: Home
  },
  {
    path: '/feed',
    name: 'feed',
    component: Feed
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    component: Profile
  },
  {
    path: '/user/:id',
    name: 'userProfile'
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.user.userId >= 1) {
    if (to.name === 'home') {
      next({ name: 'feed' })
    } else {
      next()
    }
  } else {
    if (to.name === 'feed' || to.name === 'my-profile') {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router
