import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/movie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cinema',
    name: 'cinema',
    component: () => import('../views/cinema')
  },
  {
    path: '/cinema/:id',
    name: 'cinemainfo',
    component: () => import('../views/cinema/Cinemainfo')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/Info')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../components/Address')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/mine/Login')
  },
  {
    path: '/movie/film/:id',
    name: 'film',
    component: () => import('../views/movie/Film')
  },
  {
    path: '/movie/film/photos',
    name: 'photos',
    component: () => import('../views/movie/Photos')
  }
]

const router = new VueRouter({
  routes
})

export default router
