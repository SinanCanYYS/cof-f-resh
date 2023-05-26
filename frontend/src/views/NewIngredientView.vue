<script>
import { useRestaurantStore } from '../stores/restaurant'
import { useAccountStore } from '../stores/account'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'NewIngredientView',
  data() {
    return {
      name: '',
      type: '',
      unit: ''
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useRestaurantStore, ['addIngredient']),
    async doAddIngredient() {
      // const restaurant = useRestaurantStore().restaurant._id
      await this.addIngredient(
        this.user._id,
        this.$route.params.id,
        this.name,
        this.type,
        this.unit
      )
      this.$router.push(`/restaurants/${this.$route.params.id}/ingredients`)
    }
  }
}
</script>
<template lang="pug">
.d-flex.flex-column.align-items-center.justify-content-center.min-vh-100
  h5.mb-4 Add New Ingredient
  .container.my-5
    .row.justify-content-center
      .col-sm-6
        form(@submit.prevent="doAddIngredient" class="my-3")
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="name") Name
            .col-sm-8
              input#name.form-control(v-model="name" type="text" required)
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="type") Type
            .col-sm-8
              input#type.form-control(v-model="type" type="text" required)
          .form-group.row.align-items-center.mb-3
            label.col-sm-4(for="unit") Unit
            .col-sm-8
                input#subType.form-control(v-model="unit" type="text" required)
          .form-group.row
            .col-sm-8.offset-sm-4
              button.btn.btn-outline-warning(type="submit") Add Ingredient
</template>
