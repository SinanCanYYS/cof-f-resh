<script>
import { useRestaurantStore } from '../stores/restaurant'
import { useAccountStore } from '../stores/account'
import { useOrderStore } from '../stores/order'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'NewOrderView',
  data() {
    return {
      restaurant: '',
      orderType: '',
      targetDate: '',
      notes: '',
      restaurantList: []
    }
  },
  async mounted() {
    this.restaurantList = await this.fetchRestaurantLists()
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurantLists']),
    ...mapActions(useOrderStore, ['createOrder']),
    async doNewOrder() {
      // const restaurant = useRestaurantStore().restaurant._id
      await this.createOrder(
        this.user._id,
        this.restaurant,
        this.orderType,
        this.targetDate,
        this.notes
      )
      this.$router.push(`/customerhome`)
    }
  }
}
</script>
<template lang="pug">
h1 New Order
//- h2 {{ restaurantList }}
form(@submit.prevent="doNewOrder")
  div
    label(for="restaurant") Restaurant
    select#restaurant(v-model="restaurant")
      option(v-for="restaurant in restaurantList" :key="restaurant._id" :value="restaurant._id") {{ restaurant.name }}
    //- input#restaurant(v-model="restaurant")
  div
    label(for="orderType") Order Type
    select#orderType(v-model="orderType")
      option(value="toGo") toGo
      option(value="toEat") toEat
  div
    label(for="targetDate") Target Date
    input#targetDate(v-model="targetDate")
  div
    label(for="notes") Notes
    input#notes(v-model="notes")
  div
    button(type="submit") Create Order

</template>
