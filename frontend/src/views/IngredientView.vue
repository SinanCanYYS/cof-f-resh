<script>
import { mapActions } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'

export default {
  name: 'IngredientView',
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
h1 Ingredients of {{ restaurant.name }}
br
table(align="center",border="2")
  thead
    tr
      th Name
      th Type
      th Unit
  tbody(align="left")
    tr(v-for="item in restaurant.ingredients" :key="item._id")
      td {{ item.name }}
      td {{ item.type }}
      td {{ item.unit }}


button(@click="$router.push(`/restaurants/${this.$route.params.id}/ingredients/newingredient`)") Add Ingredient
button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)") Edit
button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)") Delete
</template>
