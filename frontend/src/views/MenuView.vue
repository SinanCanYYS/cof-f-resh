<script>
import { mapActions } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'

export default {
  name: 'MenuView',
  data() {
    return {
      restaurant: {}
    }
  },

  async created() {
    this.restaurant = await this.fetchRestaurant(this.$route.params.id)
  },

  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurant'])
  }
}
</script>
<template lang="pug">
h1 Menu of {{ restaurant.name }}
br
table(align="center", border="2")
  thead
    tr
      th Name
      th Type
      th SubType
      th Price
  tbody(align="left")
    tr(v-for="item in restaurant.menu" :key="item._id")
      td {{ item.name }}
      td {{ item.type }}
      td {{ item.subType }}
      td(align="right") {{ item.price }} €
//- div
//-   div(v-for="item in restaurant.menu" :key="item._id")
//-     h3 {{ item.name }} - {{ item.type  }} - {{ item.subType }} - {{ item.price }}
br
button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/newmenuitem`)") Add Menu Item
br
button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)") Edit
br
button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)") Delete
</template>
