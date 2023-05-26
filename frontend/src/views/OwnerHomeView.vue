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
    this.ownersRestaurants = await this.fetchRestaurants(this.user)
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
div.row
  div.col-md-12
    h2(align="center") Owner Home Page
    br
    h3(align="center")  Restaurant List of {{ user.name }}
    br
    div.table-container
      table.table.table-hover(cellpadding='0' border='1')
        thead(align="center")
          tr
            th(style="font-weight: bold") Restaurant Name
        tbody(align="left")
          tr(v-for="restaurant in ownersRestaurants" :key="restaurant._id")
            td
              RouterLink(:to="`/restaurants/${restaurant._id}`") {{ restaurant.name }}
      button.btn.btn-outline-warning(@click="$router.push('/newrestaurant')" style="width: 100px;") Add New Restaurant
//- RouterLink(to="/newrestaurant") Add new Restaurant

</template>
<style scoped>
.table-container {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
```
