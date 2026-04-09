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
    component: CatalogView,
    props: true   // 🔥 también importante
  },
  {
    path: "/pago",
    name: "Pago",
    component: () => import("../views/PagoView.vue"),
    props: true   // 🔥 ESTO SOLUCIONA TU PROBLEMA
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
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