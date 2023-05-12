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
      restaurantList: [],
      sepet: []
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
    doAddItemSepet(item) {
      this.items.push(item)
    },
    async doNewOrder() {
      // const restaurant = useRestaurantStore().restaurant._id
      await this.createOrder(
        this.user._id,
        this.restaurant,
        this.orderType,
        this.targetDate,
        this.notes,
        this.items
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
  div.mb-3
    label.form-label(for="restaurant") Restaurant
    select.form-select#restaurant(v-model="restaurant")
      option(v-for="restaurant in restaurantList" :key="restaurant._id" :value="restaurant._id") {{ restaurant.name }}
    //- input#restaurant(v-model="restaurant")
  div.mb-3
    label.form-label(for="orderType") Order Type
    select.form-select#orderType(v-model="orderType")
      option(value="toGo") toGo
      option(value="toEat") toEat
  div.mb-3
    label.form-label(for="targetDate") Target Date
    input.form-control#targetDate(v-model="targetDate")
  div.mb-3
    label.form-label(for="notes") Notes
    input.form-control#notes(v-model="notes")
  div
    button.btn.btn-primary(type="submit") Create Order

</template>
