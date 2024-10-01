import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDet from '@/views/MovieDet.vue'
import CastDet from '@/views/CastDet.vue'
import PersonView from '@/views/PersonView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'MovieDet',
    component: MovieDet
  },
  {
    path: '/casts/:id',
    name: 'CastDet',
    component: CastDet
  },
  {
    path: '/person',
    name: 'PersonView',
    component: PersonView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
