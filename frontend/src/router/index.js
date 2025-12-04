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
  routes: [
    { path: '/', component: HomeView },
    { path: '/tienda', component: TiendaView }

  ],

  // 👇 Esto es lo que te faltaba
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

export default router
