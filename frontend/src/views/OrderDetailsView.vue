<script>
import { useOrderStore } from '../stores/order'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'OrderDetailsView',
  data() {
    return {
      order: null,
      menuItemId: null,
      quantity: null
    }
  },
  async created() {
    try {
      this.order = await this.fetchOrder(this.$route.params.id)
    } catch (err) {
      console.log(err)
    }
    // this.order = await this.fetchOrder(this.$route.params.id)
  },
  methods: {
    ...mapActions(useOrderStore, ['fetchOrder'])
  }
}
</script>
<template lang="pug">
h1 Order Details
div(v-if  = "order")
  //- h6 Order ID: {{ order._id }}
  h6 Restaurant Name: {{ order.restaurant.name }}
  h6 Target Date: {{ order.targetDate }}
  h6 Order Status: {{ order.status }}
  h6 Order Total: {{ order.totalCost }} €
  h6 Order Notes: {{ order.notes }}
  br
  table
    thead
      tr
        th Menu Item Name
        th Quantity
        th Menu Item Price
        th Total
    tbody
      tr(v-for="item in order.items" :key="item._id")
        td {{ item.name }}
        td {{ item.quantity }}
        td {{ item.price }} €
        td {{ item.price * item.quantity }}
        //- button(@click="orderElement.quantity++") +
        //- button(@click="orderElement.quantity--") -
  button(@click="editOrder") Edit Order
  br

  //- form(@submit.prevent="doAddOrderElement")
  //-   div.mb-3(style="display: flex; flex-wrap: wrap;")
  //-     div(style="margin-right:10px").mb-3
  //-       label.form-label(for="menuItemId") Menu Item ID
  //-       select.form-select#menuItemId(v-model="menuItemId")
  //-         option(v-for="menuItem in order.restaurant.menu" :key="menuItem._id" :value="menuItem._id") {{ menuItem.name }} - {{ menuItem.price }} €
  //-     div.mb-3
  //-       label.form-label(for="quantity") Quantity
  //-       input.form-control#quantity(v-model="quantity")
  //- div.mb-3
  //-   button(@click="doAddOrderElement") Add Order Element
</template>
