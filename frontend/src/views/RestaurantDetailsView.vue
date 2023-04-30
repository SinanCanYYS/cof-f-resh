<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'RestaurantDetailsView',
  data() {
    return {
      id: null,
      restaurant: {}
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  async mounted() {
    await this.calledRestaurant()
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurant']),
    async calledRestaurant() {
      const restaurant = await this.fetchRestaurant(this.id)
      this.restaurant = { ...restaurant }
    }
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
button(@click="$router.push(`/restaurants/${this.id}/menu`)") Menu

button(@click="$router.push(`/restaurants/${this.id}/ingredients`)") Ingredients
</template>
