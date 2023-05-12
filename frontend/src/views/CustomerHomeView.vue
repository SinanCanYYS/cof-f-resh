<script>
import { useAccountStore } from '../stores/account'
import { useOrderStore } from '../stores/order'
import { mapState, mapActions } from 'pinia'
import { ToWords } from 'to-words'

export default {
  name: 'CustomerHomeView',
  data() {
    return {
      toWords: new ToWords()
      // orders: []
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    ...mapState(useOrderStore, ['orders']),
    sortOrderByDate() {
      return this.orders.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    }
  },
  async mounted() {
    // this.orders = await this.fetchOrders()
    await this.fetchOrders()
  },
  methods: {
    ...mapActions(useOrderStore, ['fetchOrders'])
    // async beforeRouteUpdate(to, from, next) {
    //   await this.fetchOrders()
    //   next()
    // }
  }
}
</script>

<template lang="pug">
div.row
  div.col-md-6.col-sm-12
    h2 Customer Home Page
    br
    h3 Order List of {{ user?.name }}
    br
    table.table.table-hover(cellpadding='0' border='1')
      thead(align="center")
        tr
          th( align="center") Date
          th( align="center") Time
          th( align="center") Restaurant Name
          th( align="center") Target Date
          th( align="center") Order Status
          th( align="center") Order Total
          th( align="center") Order Notes
      tbody(align="left")
        tr(v-for="order in sortOrderByDate" :key="order._id")
          td
            RouterLink(:to="`/orders/${order._id}`") {{ (new Date(order.createdAt)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.') }}
          td
            RouterLink(:to="`/orders/${order._id}`") {{ (new Date(order.createdAt)).toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }) }}
          td
            RouterLink(:to="`/restaurants/${order.restaurant._id}`") {{ order.restaurant.name }}
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.targetDate }}
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.status }}
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.totalCost }} € - {{ toWords.convert(order.totalCost) }} euros
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.notes }}

    button(@click="$router.push('/neworder')") Add Order
    button(@click="$router.push('/neworderBeta')") Add Order Beta
</template>
