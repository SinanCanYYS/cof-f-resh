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
.d-flex.flex-column.align-items-center.justify-content-center.min-vh-100
  h5.mb-4 Add New Restaurant
  .container.my-5
    .row.justify-content-center
      .col-sm-6
        form(@submit.prevent="doAddRestaurant" class="my-3")
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="name") Name :
            .col-sm-8
              input#name.form-control(v-model="name" type="text" required)
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="city") City :
            .col-sm-8
              input#city.form-control(v-model="city" type="text" required)
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="district") District:
            .col-sm-8
              input#district.form-control(v-model="district" type="text" required)
          .form-group.row
            .col-sm-8.offset-sm-4
              button#submit.btn.btn-outline-warning(type="submit") Add Restaurant
</template>
