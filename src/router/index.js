import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/analogModule',
    name: 'analogModule',
    component: () => import('@/views/analogModule'),
  },
]

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})
