import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// lazyLoad
const Main = () => import('views/Main')
const CateCreate = () => import('views/categories/CateCreate')
const CateList = () => import('views/categories/CateList')
const ItemsCreate = () => import('views/items/ItemsCreate')
const ItemsList = () => import('views/items/ItemsList')
const HeroesCreate = () => import('views/heroes/HeroesCreate')
const HeroesList = () => import('views/heroes/HeroesList')
const ArticlesCreate = () => import('views/articles/ArticlesCreate')
const ArticlesList = () => import('views/articles/ArticlesList')
const AdsCreate = () => import('views/ads/AdsCreate')
const AdsList = () => import('views/ads/AdsList')

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CateCreate },
      { path: '/categories/list', component: CateList },
      { path: '/categories/edit/:id', component: CateCreate, props: true },
      { path: '/categories/edit/:id/:parent', component: CateCreate, props: true },

      { path: '/items/create', component: ItemsCreate },
      { path: '/items/list', component: ItemsList },
      { path: '/items/edit/:id', component: ItemsCreate, props: true },
      
      { path: '/heroes/create', component: HeroesCreate },
      { path: '/heroes/list', component: HeroesList },
      { path: '/heroes/edit/:id', component: HeroesCreate, props: true },

      { path: '/articles/create', component: ArticlesCreate },
      { path: '/articles/list', component: ArticlesList },
      { path: '/articles/edit/:id', component: ArticlesCreate, props: true },

      { path: '/ads/create', component: AdsCreate },
      { path: '/ads/list', component: AdsList },
      { path: '/ads/edit/:id', component: AdsCreate, props: true },
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
