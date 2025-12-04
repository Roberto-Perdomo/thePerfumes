import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

    {
    path: '/catalogo',
    name: 'catalogo',
    component: CatalogView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
