import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useRestaurantStore = defineStore('Restaurant', {
  state: () => ({
    // reactive state
    restaurant: [] // default value
  }),
  actions: {
    async fetchRestaurants(owner) {
      const allRestaurants = await axios.get('/restaurants')
      const ownersRestaurants = allRestaurants.data.filter(
        (restaurant) => restaurant.owner._id === owner._id
      )
      this.restaurant = ownersRestaurants
      return ownersRestaurants
    },
    async fetchRestaurant(id) {
      const restaurant = await axios.get(`/restaurants/${id}`)
      this.restaurant = restaurant.data
      return restaurant.data
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
