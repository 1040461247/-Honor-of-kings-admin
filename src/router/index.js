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
      { path: '/categories/list', component: CateList },
      { path: '/categories/edit/:id', component: CateCreate, props: true },
      { path: '/categories/edit/:id/:parent', component: CateCreate, props: true }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
