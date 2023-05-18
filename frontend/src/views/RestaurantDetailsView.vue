<script>
import { mapActions } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'
import { useOrderStore } from '../stores/order'

export default {
  name: 'RestaurantDetailsView',
  data() {
    return {
      restaurant: {},
      error: null,
      sortBy: 'createdAt',
      sortType: 'Ascending'
    }
  },

  computed: {
    sortedOrder() {
      return this.restaurant.orderList.sort((a, b) => {
        if (this.sortType === 'Ascending') {
          return new Date(a[this.sortBy]) - new Date(b[this.sortBy])
        } else {
          return new Date(b[this.sortBy]) - new Date(a[this.sortBy])
        }
      })
    }

    //   sortOrderByDate() {
    //     return this.restaurant.orderList.sort((a, b) => {
    //       return new Date(b.createdAt) - new Date(a.createdAt)
    //     })
    //   }
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
        this.error = error.response.data
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
          thead(style="vertical-align: middle;")
            tr.table-dark
              th
                div
                  button(@click="sortBy = 'createdAt'; sortType = 'Ascending'") a
                  | Date
                  button(@click="sortBy = 'createdAt'; sortType = 'Descending'") d
              th Time
              th Order Type
              th
                div
                  button(@click="sortBy = 'targetDate'; sortType = 'Ascending'") a
                  | Target Date
                  button(@click="sortBy = 'targetDate'; sortType = 'Descending'") d
              th Notes
              th
                div
                  button(@click="sortBy = 'totalCost'; sortType = 'Ascending'") a
                  | Total
                  button(@click="sortBy = 'totalCost'; sortType = 'Descending'") d

              th Status
              th Action
          tbody
            tr(v-for="order in sortedOrder" :key="order._id" style="vertical-align: middle;")
              td {{ (new Date(order.createdAt)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.') }}
              td {{ (new Date(order.createdAt)).toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }) }}
              td {{ order.orderType }}
              td {{ order.targetDate }}
              td {{ order.notes }}
              td {{ order.totalCost }} €
              td {{ order.status }}
              td
                button.btn.btn-info.btn-sm.me-2(v-if="(order.status === 'pending')" style="width:80px" @click="doChangeStatus(order._id, 'confirmed')") Confirm
                button.btn.btn-danger.btn-sm.me-2(v-if="(order.status === 'pending')" style="width:80px" @click="doChangeStatus(order._id, 'rejected')") Reject
                button.btn.btn-success.btn-sm.me-2(v-if="(order.status === 'confirmed')" style="width:80px" @click="doChangeStatus(order._id, 'completed')") Complete
div(v-if="error") {{ error }}
</template>
