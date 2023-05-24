<script>
import { useOrderStore } from '../stores/order'
import { mapState, mapActions } from 'pinia'
import { ToWords } from 'to-words'

export default {
  name: 'OrderDetailsView',
  data() {
    return {
      order: null,
      toWords: new ToWords()
    }
  },
  async created() {
    try {
      this.order = await this.fetchOrder(this.$route.params.id)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions(useOrderStore, ['fetchOrder'])
  }
}
</script>
<template lang="pug">

//- div(v-if  = "order")
//-   h6 Restaurant Name: {{ order.restaurant.name }}
//-   h6 Target Date: {{ order.targetDate }}
//-   h6 Order Status: {{ order.status }}
//-   h6 Order Total: {{ order.totalCost }} €
//-   h6 Order Notes: {{ order.notes }}
//-   br
//-   table
//-     thead
//-       tr
//-         th Menu Item Name
//-         th Quantity
//-         th Menu Item Price
//-         th Total
//-     tbody
//-       tr(v-for="item in order.items" :key="item._id")
//-         td {{ item.name }}
//-         td {{ item.quantity }}
//-         td {{ item.price }} €
//-         td {{ item.price * item.quantity }}
button(@click="editOrder") Edit Order
.row
  .col(style="display: flex; align-items: center; flex-direction: column;")
    h5(style="margin-top: 10px;" ) Order Details
    div(style="width: 80%; margin-right: 20px;")
      table.table.table-striped(style="width: 100%;")
        tbody
          tr.table.table-secondary
            td(style="width: 30%; font-weight: bold") Restaurant
            td.table.table-warning  {{ order.restaurant.name }}
          tr.table.table-secondary
            td(style="width: 30%; font-weight: bold") Order Type
            td.table.table-warning {{ order.orderType }}
          tr.table.table-secondary
            td(style="width: 30%; font-weight: bold") Target Date
            td.table.table-warning {{ order.targetDate }}
          tr.table.table-secondary
            td(style="width: 30%; font-weight: bold") Target Time
            td.table.table-warning {{ order.targetTime }}
          tr.table.table-secondary
            td(style="width: 30%; font-weight: bold") Notes
            td.table.table-warning {{ order.notes }}
          tr.table.table-secondary
            td(style="width: 30%; font-weight: bold") Order Status
            td.table.table-warning {{ order.status }}
          tr.table.table-secondary
            td(style="width: 30%; font-weight: bold") Order Total
            td.table.table-warning {{ order.totalCost }} € - {{ toWords.convert(order.totalCost) }} euros
  .col(style="display: flex; align-items: center; flex-direction: column;")
    h5(style="margin-top: 10px" ) Cart Details
    div(style="width: 80%; margin-right: 20px;")
      table.table.table-striped(style="width: 100%;")
        thead
          tr.table-info
            th(style="font-weight: bold;") Item
            th(style="font-weight: bold;") Quantity
            th(style="font-weight: bold;") Price
            th(style="font-weight: bold;") Total
        tbody
          tr(v-for="item in order.items" :key="item._id")
            td {{ item.name }}
            td {{ item.quantity }}
            td {{ item.price }} €
            td {{ item.price * item.quantity}}
        tfoot
          tr.table-dark
            td
            td
            td
            td {{ order.totalCost }} €
</template>
