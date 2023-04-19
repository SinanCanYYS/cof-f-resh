import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
//import RestaurantsView from '../views/RestaurantsView.vue'
//import OrdersView from '../views/OrdersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/:id',
      name: 'user details',
      component: () => import('../views/UserDetailsView.vue')
    },
    // {
    //   path: '/restaurants',
    //   name: 'restaurants',
    //   component: RestaurantsView
    // },
    // {
    //   path: '/orders',
    //   name: 'orders',
    //   component: OrdersView
    // },
    {
      path: '/orders/:id',
      name: 'order details',
      component: () => import('../views/OrderDetailsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
