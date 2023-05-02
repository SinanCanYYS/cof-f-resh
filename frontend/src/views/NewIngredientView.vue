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
h1 Add New Ingredient

form(@submit.prevent="doAddIngredient")
  div
    label(for="name") Name
    input#name(v-model="name")
  div
    label(for="type") Type
    input#type(v-model="type")
  div
    label(for="subType") Unit
    input#subType(v-model="unit")
  div
    button(type="submit") Add Ingredient
</template>
