<script>
import { useOrderStore } from '../stores/order'
import { mapState, mapActions } from 'pinia'
import OrderElements from '../components/OrderElements.vue'

export default {
  name: 'OrderDetailsView',
  components: {
    OrderElements
  },
  data() {
    return {
      order: null,
      menuItemId: null,
      quantity: null
    }
  },
  async created() {
    this.order = await this.fetchOrder(this.$route.params.id)
  },
  methods: {
    ...mapActions(useOrderStore, ['addOrderElement', 'fetchOrder', 'fetchMenu']),
    async doAddOrderElement() {
      // const menuItemId = prompt('Enter the ID of the menu item:')
      // const quantity = parseInt(prompt('Enter the quantity:'))
      await useOrderStore().addOrderElement(this.order._id, this.menuItemId, this.quantity)
    }
  }
}
</script>
<template lang="pug">
h1 Order Details
h6 Order ID: {{ order._id }}
h6 Restaurant Name: {{ order.restaurant.name }}
h6 Target Date: {{ order.targetDate }}
h6 Order Status: {{ order.status }}
h6 Order Total: {{ order.totalCost }}
h6 Order Notes: {{ order.notes }}
br
table
  thead
    tr
      th Order Element ID
      th Menu Item Name
      th Quantity
      th Menu Item Price
      th Total
  tbody
    tr(v-for="orderElement in order.items" :key="orderElement._id")
      td {{ orderElement._id }}
      td {{ orderElement.menuItem.name }}
      td {{ orderElement.quantity }}
      td {{ orderElement.menuItem.price }}
      td {{ orderElement.menuItem.price * orderElement.quantity }}

//- OrderElements(:orderID="order._id")
br

form(@submit.prevent="doAddOrderElement")
  div.mb-3
    label.form-label(for="menuItemId") Menu Item ID
    select.form-select#menuItemId(v-model="menuItemId")
      option(v-for="menuItem in order.restaurant.menu" :key="menuItem._id" :value="menuItem._id") {{ menuItem.name }} - {{ menuItem.price }} €
    //- input.form-control#menuItemId(v-model="menuItemId")
  div.mb-3
    label.form-label(for="quantity") Quantity
    input.form-control#quantity(v-model="quantity")
  div.mb-3
button(@click="doAddOrderElement") Add Order Element
</template>
