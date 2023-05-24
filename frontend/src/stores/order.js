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
    async createOrder(customer, restaurantId, orderType, targetDate, targetTime, notes, cart) {
      this.order = (
        await axios.post('/orders', {
          customer: customer,
          restaurant: restaurantId,
          type: orderType,
          targetDate: targetDate,
          targetTime: targetTime,
          notes: notes,
          items: cart
        })
      ).data
    },
    async addOrderElement(orderId, menuItem, quantity) {
      await axios.post(`/orders/${orderId}/order-elements`, {
        menuItem: menuItem,
        quantity: quantity
      })
    },
    async changeStatus(orderId, status) {
      await axios.patch(`/orders/${orderId}`, {
        status: status
      })
    },
    async fetchOrder(orderId) {
      return (await axios.get(`/orders/${orderId}`)).data
    },
    async fetchOrders() {
      this.orders = (await axios.get(`/orders`)).data
      return this.orders
    },
    async fetchMenu(restaurantId) {
      return (await axios.get(`/restaurants/${restaurantId}/menu`)).data
    }
    // async fetchOrderElements(orderId) {
    //   return (await axios.get(`/orders/${orderId}/order-elements`)).data
    // }
  }
})
