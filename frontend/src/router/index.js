import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/feed',
    component: Feed
  },
  {
    path: '/my-profile',
    component: Profile
  },
  {
    path: '/contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes
})

export default router
