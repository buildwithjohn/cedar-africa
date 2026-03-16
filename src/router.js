import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DashboardView from './views/DashboardView.vue'

const routes = [
  { path: '/', component: App },
  { path: '/dashboard', component: DashboardView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})
