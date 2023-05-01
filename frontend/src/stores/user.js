import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('User', {
  state: () => ({
    user: null
  }),
  actions: {
    async signup(username, email, password, type) {
      this.user = axios.post('/users', {
        name: username,
        email: email,
        password: password,
        type: type
      }).data
    }
  }
})
