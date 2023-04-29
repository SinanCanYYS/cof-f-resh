import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useRestaurantStore = defineStore('Restaurant', {
  state: () => ({
    // reactive state
    restaurant: null // default value
  }),
  actions: {
    // async fetchUser() {
    //   this.user = (await axios.get('/accounts/session')).data
    // },
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
