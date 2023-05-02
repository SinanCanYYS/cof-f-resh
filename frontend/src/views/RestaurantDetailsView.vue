<script>
import { mapActions } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'

export default {
  name: 'RestaurantDetailsView',
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
h1 Restaurant Details
br
h2 {{ restaurant.name }}
br
h3 {{ restaurant.city }} - {{ restaurant.district }}
br
button(@click="$router.push('/orders')") Orders
button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu`)") Menu
button(@click="$router.push(`/restaurants/${this.$route.params.id}/ingredients`)") Ingredients
</template>
