<script>
import axios from 'axios'
import { useRestaurantStore } from '../stores/restaurant'
import { useAccountStore } from '../stores/account'
import { mapActions } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'NewRestaurantView',
  data() {
    return {
      name: '',
      city: '',
      district: ''
    }
  },
  methods: {
    ...mapActions(useRestaurantStore, ['addRestaurant']),
    async doAddRestaurant() {
      const owner = useAccountStore().user._id
      await this.addRestaurant(this.name, owner, this.city, this.district)
      this.$router.push('/ownerhome')
    }
  }
}
</script>

<template lang="pug">
h2 Add Restaurant

  form(@submit.prevent="doAddRestaurant")
    div
      label(for="name") Name :
      input#name(v-model="name" type="text" required)
    div
      label(for="city") City        :
      input#city(v-model="city" type="text" required)
    div
      label(for="district") District:
      input#district(v-model="district" type="text" required)
    button#submit(type="submit") Add
</template>
