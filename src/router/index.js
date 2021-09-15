import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/trans',
    name: 'Trans',
    component: () => import('../views/Trans.vue')
  },
  {
    path: '/searchForm',
    name: 'SearchForm',
    component: () => import('../views/SearchForm.vue')
  },
  {
    path: '/class',
    name: 'Class',
    component: () => import('../views/Class.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
