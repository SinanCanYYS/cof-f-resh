import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
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
      path: '/customerhome',
      name: 'customerhome',
      component: () => import('../views/CustomerHomeView.vue')
    },
    {
      path: '/ownerhome',
      name: 'ownerhome',
      component: () => import('../views/OwnerHomeView.vue')
    },
    {
      path: '/users/:id',
      name: 'user details',
      component: () => import('../views/UserDetailsView.vue')
    },
    {
      path: '/newrestaurant',
      name: 'add restaurant',
      component: () => import('../views/NewRestaurantView.vue')
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: RestaurantsView
    },
    {
      path: '/restaurants/:id',
      name: 'restaurants details',
      component: () => import('../views/RestaurantDetailsView.vue')
    },
    {
      path: '/restaurants/:id/menu',
      name: 'restaurants menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/restaurants/:id/ingredients',
      name: 'restaurants ingredients',
      component: () => import('../views/IngredientView.vue')
    },
    {
      path: '/restaurants/:id/menu/newmenuitem',
      name: 'new menu item',
      component: () => import('../views/NewMenuItemView.vue')
    },
    {
      path: '/restaurants/:id/ingredients/newingredient',
      name: 'new ingredient',
      component: () => import('../views/NewIngredientView.vue')
    },
    // {
    //   path: '/orders',
    //   name: 'orders',
    //   component: OrdersView
    // },
    {
      path: '/neworder',
      name: 'new order',
      component: () => import('../views/NewOrderView.vue')
    },
    {
      path: '/neworderBeta',
      name: 'new order Beta',
      component: () => import('../views/NewOrderViewBeta.vue')
    },
    {
      path: '/orders/:id',
      name: 'order details',
      component: () => import('../views/OrderDetailsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
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
