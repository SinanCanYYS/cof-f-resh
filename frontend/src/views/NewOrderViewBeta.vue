<script>
import { useRestaurantStore } from '../stores/restaurant'
import { useAccountStore } from '../stores/account'
import { useOrderStore } from '../stores/order'
import { mapState, mapActions } from 'pinia'
import { reactive } from 'vue'

export default {
  name: 'NewOrderView',
  data() {
    return {
      restaurant: '',
      orderType: '',
      targetDate: '',
      notes: '',
      restaurantList: [],
      quantity: 1,
      cart: []
    }
  },
  async mounted() {
    this.restaurantList = await this.fetchRestaurantLists()
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    calculateTotal() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }

    // selectedRestaurant() {
    //   const restaurant = this.restaurantList.find(
    //     (restaurant) => restaurant._id === this.restaurant
    //   )
    //   if (!restaurant) return null
    //   // Create a new `quantity` property for each menu item
    //   return {
    //     ...restaurant,
    //     menu: restaurant.menu.map((item) => {
    //       const reactiveItem = reactive(item)
    //       reactiveItem.quantity = 1
    //       return reactiveItem
    //     })
    //   }
    // }
  },
  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurantLists']),
    ...mapActions(useOrderStore, ['createOrder']),
    increseQty(item) {
      item.quantity = item.quantity || 0 // if quantity is undefined, set it to 0
      item.quantity++
    },
    decreseQty(item) {
      item.quantity = item.quantity || 0 // if quantity is undefined, set it to 0
      if (item.quantity > 0) item.quantity--
    },
    addToCart(item) {
      this.cart.push(item)
    },
    async doNewOrder() {
      // const restaurant = useRestaurantStore().restaurant._id
      await this.createOrder(
        this.user._id,
        this.restaurant,
        this.orderType,
        this.targetDate,
        this.notes,
        this.cart
      )
      this.$router.push(`/customerhome`)
    }
  },
  watch: {
    restaurant: function () {
      this.cart = []
    }
  } // end watch
}
</script>
<template lang="pug">
h5 New Order Beta
div.container-cart
  div.row
    div.col
      form(@submit.prevent="doNewOrder")
        div.row
          div.col
            label.form-label(for="restaurant") Restaurant
            select.form-select#restaurant(v-model="restaurant")
              option.selected Choose a restaurant
              option(v-for="restaurant in restaurantList" :key="restaurant._id" :value="restaurant") {{ restaurant.name }}
            //- input#restaurant(v-model="restaurant")
          div.col
            label.form-label(for="orderType") Order Type
            select.form-select#orderType(v-model="orderType")
              option(value="toGo") toGo
              option(value="toEat") toEat
          div.col
            label.form-label(for="targetDate") Target Date
            //- b-form-datepicker#targetDate(v-model="targetDate" :no-close-butoon="true")
            input.form-control#targetDate(type="date" v-model="targetDate")
            //- input.form-control#targetDate(v-model="targetDate")
          div.col
            label.form-label(for="targetTime") Target Time
            input.form-control#targetTime(type="time" v-model="targetTime")
        div.row
          div.col-12
            label.form-label(for="notes") Notes
            input.form-control#notes(v-model="notes")
    div.col
      div(v-if = "restaurant")
        h6 Menu of {{ restaurant.name }}
          div.row
            div.col
              table.table.table-striped
                thead
                  tr.table-dark
                    th Name - Price
                    th Quantity
                tbody
                  tr(v-for="item in restaurant.menu" :key="item._id")
                    td {{ item.name }} - {{ item.price }} €
                    td
                      button(@click="decreseQty(item)") -
                      | {{ item.quantity || 0 }}
                      button(@click="increseQty(item)") +
                    button(@click="addToCart(item)") Add
                tfoot
                  tr.table-dark
                    td
                    td
                    td
            div.col

div
  button.btn.btn-primary(@click="doNewOrder") Create Order

div.col
  h3 Cart
  table.table.table-striped
    thead
      tr.table-dark
        th Name
        th Quantity
        th Price
        th Total
    tbody
      tr(v-for="item in cart" :key="item._id")
        td {{ item.name }}
        td {{ item.quantity }}
        td {{ item.price }} €
        td {{ item.price * item.quantity}}
    tfoot
      tr.table-dark
        td
        td
        td
        td {{ calculateTotal }} €





</template>
