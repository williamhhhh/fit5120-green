import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/views/HomePage.vue'
import GreenAdvice from '../components/views/GreenAdvice.vue'
// import { name } from '@vue/eslint-config-prettier/skip-formatting'
import GreenMap from '../components/views/GreenMap.vue'
// import { name } from '@vue/eslint-config-prettier/skip-formatting'
import ChatPage from '@/components/views/ChatPage.vue'
import GreenCalculator from '@/components/views/GreenCalculator.vue'


const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
        path: '/GreenAdvice',
        name: 'GreenAdvice',
        component: GreenAdvice,
    },
    {
      path: '/GreenMap',
      name: 'GreenMap',
      component: GreenMap,
    },
    {
      path: '/Chat',
      name: 'ChatPage',
      component: ChatPage,
    },
    {
      path: '/GreenCalculator',
      name: 'GreenCalculator',
      component: GreenCalculator,
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router