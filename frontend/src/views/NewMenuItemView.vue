<script>
import { useRestaurantStore } from '../stores/restaurant'
import { useAccountStore } from '../stores/account'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'NewMenuItemView',
  data() {
    return {
      name: '',
      type: '',
      subType: '',
      price: ''
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useRestaurantStore, ['addMenuItem']),
    async doAddMenuItem() {
      // const restaurant = useRestaurantStore().restaurant._id
      await this.addMenuItem(
        this.user._id,
        this.$route.params.id,
        this.name,
        this.type,
        this.subType,
        this.price
      )
      this.$router.push(`/restaurants/${this.$route.params.id}/menu`)
    }
  }
}
</script>
<template lang="pug">
.d-flex.flex-column.align-items-center.justify-content-center.min-vh-100
  h5.mb-4 Add New Menu Item
  .container.my-5
    .row.justify-content-center
      .col-sm-6
        form(@submit.prevent="doAddMenuItem" class="my-3")
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="name") Name
            .col-sm-8
              input#name.form-control(v-model="name" type="text" required)
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="type") Type
            .col-sm-8
              input#type.form-control(v-model="type" type="text" required)
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="subType") Sub Type
            .col-sm-8
                input#subType.form-control(v-model="subType" type="text" required)
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="price") Price
            .col-sm-8
                input#price.form-control(v-model="price" type="number" step="0.5" required)
          .form-group.row
            .col-sm-8.offset-sm-4
              button.btn.btn-outline-warning(type="submit") Add Menu Item
</template>
