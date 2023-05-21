import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import View from '../views/View.vue'
import Login from '../views/Login.vue'
import Buscar from '../views/Buscar.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/view/:bookid',
    name: 'View',
    component: View
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search/:book',
    name: 'Buscar',
    component: Buscar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
