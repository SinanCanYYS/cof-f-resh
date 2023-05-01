<script>
// import axios from 'axios'
// import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'

// axios.defaults.withCredentials = true
// axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'IngredientView',
  data() {
    return {
      id: null,
      restaurant: {},
      menu: []
    }
  },
  // created() {
  //   this.id = this.$route.params.id
  // },
  async created() {
    await this.calledRestaurant()
  },
  computed: {
    // ...mapState(useAccountStore, ['user']),
    // ...mapState(useRestaurantStore, ['restaurant'])
  },
  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurant']),
    async calledRestaurant() {
      this.restaurant = await this.fetchRestaurant(this.$route.params.id)
      // this.menu.push(...restaurantMenu)
    }
  }
}
</script>
<template lang="pug">
h1 Ingredients of {{ restaurant.name }}
br
div
  div(v-for="item in restaurant.menu" :key="item._id")
    h3 {{ item.name }}
    p {{ item.type  }}
    p {{ item.price }}

  button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/newMenuItem`)") Add Menu Item
  button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)") Edit
  button(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)") Delete
</template>
