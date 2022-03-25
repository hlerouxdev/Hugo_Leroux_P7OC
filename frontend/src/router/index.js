import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/feed',
    component: Feed
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes
})

export default router
