import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useAccountStore = defineStore('Account', {
  state: () => ({
    // reactive state
    user: null // default value
  }),
  actions: {
    async fetchUser() {
      this.user = (await axios.get('/accounts/session')).data
    },
    async login(email, password) {
      this.user = (
        await axios.post('/accounts/session', {
          email: email,
          password: password
        })
      ).data
      return this.user
    },
    async logout() {
      await axios.delete('/accounts/session')
      this.user = null
    }
  }
})
