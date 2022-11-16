import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/workers',
    name: 'workers',
    component: () => import(/* webpackChunkName: "workers" */ '../views/WorkerPage.vue')
  },
  {
    path: '/directions',
    name: 'directions',
    component: () => import(/* webpackChunkName: "directions" */ '../views/DirectionPage.vue')
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import(/* webpackChunkName: "groups" */ '../views/GroupPage.vue')
  },
  {
    path: '/pupils',
    name: 'pupils',
    component: () => import(/* webpackChunkName: "pupils" */ '../views/PupilPage.vue')
  },
  {
    path: '/spending',
    name: 'spending',
    component: () => import(/* webpackChunkName: "spending" */ '../views/SpendingPage.vue')
  },
  {
    path: '/payments',
    name: 'payments',
    component: () => import(/* webpackChunkName: "payments" */ '../views/PaymentsPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
