import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useRestaurantStore = defineStore('Restaurant', {
  state: () => ({
    restaurant: []
  }),
  actions: {
    async fetchRestaurantLists() {
      const allRestaurants = await axios.get('/restaurants')
      return allRestaurants.data
    },
    async fetchRestaurants(owner) {
      const allRestaurants = await axios.get('/restaurants')
      const ownersRestaurants = allRestaurants.data.filter(
        (restaurant) => restaurant.owner._id === owner._id
      )
      return ownersRestaurants
    },
    async fetchRestaurant(id) {
      const restaurant = await axios.get(`/restaurants/${id}`)
      this.restaurant = restaurant.data
      return restaurant.data
    },
    async fetchMenu(id) {
      const restaurant = await axios.get(`/restaurants/${id}`)
      this.restaurant = restaurant.data
      const menu = restaurant.data.menu
      return menu
    },
    async addMenuItem(userId, restaurantId, name, type, subType, price) {
      const menuItem = await axios.post(`/restaurants/${restaurantId}/menu-items`, {
        user: userId,
        name: name,
        type: type,
        subType: subType,
        price: price
      })
      return menuItem.data
    },
    async addIngredient(userId, restaurantId, name, type, unit) {
      const newIngredient = await axios.post(`/restaurants/${restaurantId}/ingredients`, {
        user: userId,
        name: name,
        type: type,
        unit: unit
      })
      return newIngredient.data
    },
    async addRestaurant(name, owner, city, district) {
      this.restaurant = axios.post('/restaurants', {
        name: name,
        owner: owner,
        city: city,
        district: district
      }).data
    }
  }
})
