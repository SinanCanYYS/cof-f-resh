<script>
import { useAccountStore } from '../stores/account'
import { useOrderStore } from '../stores/order'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'CustomerHomeView',
  data() {
    return {
      orders: []
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  async mounted() {
    this.orders = await this.fetchOrders()
  },
  methods: {
    ...mapActions(useOrderStore, ['fetchOrders'])
  }
}
</script>

<template lang="pug">
div.row
  div.col-md-6.col-sm-12
    h2 Customer Home Page
    br
    h3 Order List of {{ user.name }}
    br
    table.table.table-hover(cellpadding='0' border='1')
      thead(align="center")
        tr
          th( align="center") Restaurant Name
          th( align="center") Target Date
          th( align="center") Order Status
          th( align="center") Order Total
          th( align="center") Order Notes
      tbody(align="left")
        tr(v-for="order in orders" :key="order._id")
          td
            RouterLink(:to="`/restaurants/${order.restaurant._id}`") {{ order.restaurant.name }}
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.targetDate }}
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.status }}
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.totalCost }} €
          td
            RouterLink(:to="`/orders/${order._id}`") {{ order.notes }}
    button(@click="$router.push('/neworder')") Add Order
</template>
