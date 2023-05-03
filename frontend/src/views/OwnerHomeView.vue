<script>
import axios from 'axios'
// import { RouterLink } from 'vue-router'
import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'OwnerHomeView',
  data() {
    return {
      ownersRestaurants: []
    }
  },
  async mounted() {
    this.ownersRestaurants = await this.fetchRestaurants()
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurants'])
    // async ownersRestaurants() {
    //   this.restaurants = await this.fetchRestaurants(this.user)
    // }
  }
}
</script>

<template lang="pug">
br
h2 Owner Home Page
br
h3 Restaurant List of {{ user.name }}
br
table(cellpadding='0' border='1')
  thead(align="center")
    tr
      th( align="center") Restaurant Name
  tbody(align="left")
    tr(v-for="restaurant in ownersRestaurants" :key="restaurant._id")
      td
        RouterLink(:to="`/restaurants/${restaurant._id}`") {{ restaurant.name }}

//- ul Restaurant List of {{ user.name }}
//-   li(v-for="restaurant in restaurants" :key="restaurant._id")
//-   RouterLink(:to="`/restaurants/${restaurant._id}`") {{ restaurant.name }} - {{ restaurant.city }} - {{ restaurant.district }}
br
button(@click="$router.push('/newrestaurant')") Add Restaurant
//- RouterLink(to="/newrestaurant") Add new Restaurant

</template>
