import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TiendaView from '../views/TiendaView.vue'


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
