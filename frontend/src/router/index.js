import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import Contact from '../views/Contact.vue'
import UserProfile from '../views/UserProfile.vue'
import Messages from '../views/Messages.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'acceuil Groupomania'
    }
  },
  {
    path: '/feed',
    name: 'feed',
    component: Feed,
    meta: {
      title: 'workplace Groupomania'
    }
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    component: Profile,
    meta: {
      title: 'mon profil'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: {
      title: 'contact Groupomania'
    }
  },
  {
    path: '/user/',
    name: 'userProfile',
    component: UserProfile,
    // params: { id: userId },
    props: true,
    meta: {
      title: 'profile utilisateur'
    }
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
    meta: {
      title: 'messages'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: '404 adresse inconnue'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (from.name === 'messages' || to.name === 'messages') {
    store.commit('clearMessagesUsers')
  }
  if (store.state.user.userId >= 1) {
    if (to.name === 'home') {
      next({ name: 'feed' })
    } else {
      next()
    }
  } else {
    if (to.name === 'feed' || to.name === 'my-profile' || to.name === 'userProfile' || to.name === 'messages') {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
