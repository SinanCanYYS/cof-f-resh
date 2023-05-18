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
    ...mapActions(useOrderStore, ['fetchOrders', 'changeStatus']),
    async doChangeStatus(orderId, status) {
      await this.changeStatus(orderId, status)

      await this.fetchOrders()
    }
    // async beforeRouteUpdate(to, from, next) {
    //   await this.fetchOrders()
    //   next()
    // }
  }
}
</script>

<template lang="pug">
div.row
  div.col-md-12
    h2(align="center") Customer Home Page
    br
    h3(align="center") Order List of {{ user?.name }}
    br
    table.table.table-hover(cellpadding='' border='1')
      thead(align="center")
        tr
          th( align="center") Order Date
          th( align="center") Order Time
          th( align="left") Restaurant Name
          th( align="center") Target Date
          th( align="center") Order Total
          th( align="center") Order Notes
          th( align="center") Order Status
      tbody(align="left")
        tr(v-for="order in sortOrderByDate" :key="order._id" style="vertical-align: middle;")
          td( align="center")
            RouterLink(:to="`/orders/${order._id}`") {{ (new Date(order.createdAt)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.') }}
          td( align="center")
            RouterLink(:to="`/orders/${order._id}`") {{ (new Date(order.createdAt)).toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }) }}
          td( align="left")
            RouterLink(:to="`/restaurants/${order.restaurant._id}`") {{ order.restaurant.name }}
          td( align="center")
            RouterLink(:to="`/orders/${order._id}`") {{ order.targetDate }}
          td( align="center")
            RouterLink(:to="`/orders/${order._id}`") {{ order.totalCost }} € - {{ toWords.convert(order.totalCost) }} euros
          td( align="left", style="word-wrap: break-word;")
            RouterLink(:to="`/orders/${order._id}`") {{ order.notes }}
          td( align="center")
            RouterLink(:to="`/orders/${order._id}`") {{ order.status }}
          td
            button.btn.btn-info.btn-sm.me-2(v-if="(order.status === 'pending')" style="width:80px" @click="doChangeStatus(order._id, 'cancelled')") Cancel

    button(@click="$router.push('/neworder')") Add Order
    button(@click="$router.push('/neworderBeta')") Add Order Beta
</template>
