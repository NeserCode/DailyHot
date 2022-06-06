import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: 'searchWeiboForm'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
