import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/trans',
    name: 'trans',
    component: () => import('../views/Trans.vue')
  },
  {
    path: '/searchWeiboForm',
    name: 'searchWeiboForm',
    component: () => import('../views/SearchWeiboForm.vue')
  },
  {
    path: '/searchZhihuForm',
    name: 'searchZhihuForm',
    component: () => import('../views/SearchZhihuForm.vue')
  },
  {
    path: '/searchDouyinForm',
    name: 'searchDouyinForm',
    component: () => import('../views/SearchDouyinForm.vue')
  },
  {
    path: '/class',
    name: 'class',
    component: () => import('../views/Class.vue')
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/Game.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
