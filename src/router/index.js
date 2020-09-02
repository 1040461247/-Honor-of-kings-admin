import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// lazyLoad
const Main = () => import('views/Main')
const CateCreate = () => import('views/categories/CateCreate')
const CateList = () => import('views/categories/CateList')

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CateCreate },
      { path: '/categories/list', component: CateList }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
