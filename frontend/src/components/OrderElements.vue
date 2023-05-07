<script>
import { useOrderStore } from '../stores/order'

export default {
  name: 'OrderElements',
  props: {
    orderID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      orderElements: []
    }
  },
  async created() {
    await this.fetchOrderElements()
  },
  methods: {
    async fetchOrderElements() {
      this.orderElements = await useOrderStore().fetchOrderElements(this.orderID)
    },
    doCreateOrderElement() {
      this.$router.push(`/orders/${this.order._id}/newOrderElement`)
    },
    fetchMenuLists() {
      return useOrderStore().fetchMenuLists()
    }
  }
}
</script>
<template lang="pug">
h5 here will come "Order Element Component"
//- form(@submit.prevent="doNewOrder")
//-   div.mb-1
//-     label.form-label(for="restaurant") Menu Item
//-     select.form-select#restaurant(v-model="restaurant")
//-       option(v-for="menuItem in menuList" :key="menuItem._id" :value="restaurant._id") {{ restaurant.name }}
//-     //- input#restaurant(v-model="restaurant")

//-   div.mb-1
//-     label.form-label(for="targetDate") Quantity
//-     input.form-control#targetDate(v-model="targetDate")

//-   div
//-     button.btn.btn-primary(type="submit") Create Order

</template>
