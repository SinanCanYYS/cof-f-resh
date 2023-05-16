<script>
import { mapActions } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'
import { useOrderStore } from '../stores/order'

export default {
  name: 'RestaurantDetailsView',
  data() {
    return {
      restaurant: {},
      error: null
    }
  },

  computed: {
    sortOrderByDate() {
      return this.restaurant.orderList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    }
  },

  async created() {
    this.restaurant = await this.fetchRestaurant(this.$route.params.id)
  },

  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurant']),
    ...mapActions(useOrderStore, ['changeStatus']),
    async doChangeStatus(orderID, status) {
      try {
        await this.changeStatus(orderID, status)
        //find the order in the restaurant.orderList and change its status
        const order = this.restaurant.orderList.find((order) => order._id === orderID)
        order.status = status

        // this.restaurant = await this.fetchRestaurant(this.$route.params.id)
        // this.$set(this.restaurant.orderList)
        // this.$forceUpdate()
      } catch (error) {
        this.error = error.response.data.message
      }
    }
  },
  watch: {
    onButtonClicked() {
      this.$forceUpdate()
    }
  }
}
</script>
<template lang="pug">
h2(align="center") Restaurant Details
br
h3(align="center") {{ restaurant.name }}
h3(align="center") {{ restaurant.city }} - {{ restaurant.district }}
br
button(@click="$router.push('/orders')") Orders
button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu`)") Menu
button(@click="$router.push(`/restaurants/${this.$route.params.id}/ingredients`)") Ingredients
div
  h6(align="center") Orders of {{ restaurant.name }}
    div.row
      div.col
        table.table.table-striped
          thead
            tr.table-dark
              th Date
              th Time
              th Order Type
              th Target Date
              th Notes
              th Total
              th Status
          tbody
            tr(v-for="order in sortOrderByDate" :key="order._id")
              td {{ (new Date(order.createdAt)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.') }}
              td {{ (new Date(order.createdAt)).toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }) }}
              td {{ order.orderType }}
              td {{ order.targetDate }}
              td {{ order.notes }}
              td {{ order.totalCost }} €
              td {{ order.status }}
              td
                button.btn.btn-info(v-if="(order.status === 'pending')" @click="doChangeStatus(order._id, 'confirmed')") Confirm
                button.btn.btn-danger(v-if="(order.status === 'pending')" @click="doChangeStatus(order._id, 'rejected')") Reject
                button.btn.btn-success(v-if="(order.status === 'confirmed')" @click="doChangeStatus(order._id, 'completed')") Complete
div(v-if="error") {{ error }}
</template>
