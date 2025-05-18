import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/views/HomePage.vue'
import GreenAdvice from '../components/views/GreenAdvice.vue'
import GreenMap from '../components/views/GreenMap.vue'
import ChatPage from '@/components/views/ChatPage.vue'
import GreenCalculator from '@/components/views/GreenCalculator.vue'
import StoryTelling from '@/components/views/StoryTelling.vue'
import LoginPage from '../components/views/LoginPage.vue'
import { getAuth } from 'firebase/auth'
import InfoPage from '@/components/views/InfoPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    meta: { hideHeader: true }
  },
  {
    path: '/info',
    name: 'InfoPage',
    component: InfoPage,
    meta: { hideHeader: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { hideHeader: false, requiresAuth: true }
  },
  {
    path: '/GreenAdvice',
    name: 'GreenAdvice',
    component: GreenAdvice,
    meta: { hideHeader: false, requiresAuth: true }
  },
  {
    path: '/GreenMap',
    name: 'GreenMap',
    component: GreenMap,
    meta: { hideHeader: false, requiresAuth: true }
  },
  {
    path: '/Chat',
    name: 'ChatPage',
    component: ChatPage,
    meta: { hideHeader: false, requiresAuth: true }
  },
  {
    path: '/GreenCalculator',
    name: 'GreenCalculator',
    component: GreenCalculator,
    meta: { hideHeader: false, requiresAuth: true }
  },
  {
    path: '/StoryTelling',
    name: 'StoryTelling',
    component: StoryTelling,
    meta: { hideHeader: false, requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next({ path: '/' })
  } else {
    next() 
  }
})

export default router