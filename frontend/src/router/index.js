import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
import PagoView from '@/views/PagoView.vue'

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
  },
  {
    path: "/pago",
      name: "Pago",
      component: () => import("../views/PagoView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // Scroll suave a anclas (#inicio, #contacto, etc)
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router