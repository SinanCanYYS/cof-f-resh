import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useOrderStore = defineStore('Order', {
  state: () => ({
    order: null,
    orders: []
  }),
  actions: {
    async createOrder(customer, restaurantId, orderType, targetDate, notes) {
      this.order = axios.post('/orders', {
        customer: customer,
        restaurant: restaurantId,
        type: orderType,
        targetDate: targetDate,
        notes: notes
      }).data
    },
    async addOrderElement(orderId, customerId, menuItem, quantity) {
      axios.post(`/orders/${orderId}/order-elements`, {
        customer: customerId,
        menuItem: menuItem,
        quantity: quantity
      })
    },
    async changeStatus(orderId, customerId, status) {
      axios.patch(`/orders/${orderId}`, {
        user: customerId,
        status: status
      })
    },
    async fetchOrder(orderId) {
      this.order = axios.get(`/orders/${orderId}`).data
    },
    async fetchOrders() {
      this.orders = (await axios.get(`/orders`)).data
      return this.orders
    }
  }
})
