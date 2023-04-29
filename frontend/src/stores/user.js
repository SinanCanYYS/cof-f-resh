import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('User', {
  state: () => ({
    // reactive state
    user: null // default value
  }),
  actions: {
    // async fetchUser() {
    //   this.user = (await axios.get('/accounts/session')).data
    // },
    async signup(username, email, password, type) {
      this.user = axios.post('/users', {
        name: username,
        email: email,
        password: password,
        type: type
      }).data
    }

    // async logout() {
    //   await axios.delete('/accounts/session')
    //   this.user = null
    // }
  }
})
