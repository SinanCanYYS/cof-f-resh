<script>
import { mapActions } from 'pinia'
import { useOrderStore } from '../stores/order'
import Counter from './Counter.vue'

export default {
  name: 'OrderElements',
  components: {
    Counter
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuItemId: 'Select a menu item',
      quantity: null
    }
  },
  // async created() {
  //   this.order = await this.fetchOrder(this.orderID)
  // },
  methods: {
    ...mapActions(useOrderStore, ['addOrderElement']),
    async doAddOrderElement() {
      if (this.menuItemId === 'Select a menu item') {
        alert('Please select a menu item')
        return
      }
      // const menuItemId = prompt('Enter the ID of the menu item:')
      // const quantity = parseInt(prompt('Enter the quantity:'))
      await this.addOrderElement(this.order._id, this.menuItemId, this.quantity)
    }
  }
}
</script>
<template lang="pug">

form(@submit.prevent="doAddOrderElement")
  div.mb-3(style="display: flex; flex-wrap: wrap;")
    div(style="margin-right:10px").mb-3
      //- label(for="menuItemId") Menu Item ID
      select.form-select#menuItemId(v-model="menuItemId")
        //- option(value="Select a menu item" selected disabled) Select a menu item
        option.selected Select a menu item
        option(v-for="menuItem in order.restaurant.menu" :key="menuItem._id" :value="menuItem._id") {{ menuItem.name }} - {{ menuItem.price }} €
    div
      //- label.form-label(for="quantity") Quantity
      //- input.form-control#quantity(v-model="quantity")
      input.form-control#quantity(type="number", placeholder="Quantity", aria-label="Quantity", v-model="quantity")
    div
      input(type="submit", value="Add Order Element")
    //- div
    //-   Counter
</template>
