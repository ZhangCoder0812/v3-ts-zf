import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

// RouteRecordRaw 原始的路由记录 泛型 。好处：添加路由信息时有提示
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/mine/index.vue')
  }, {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
