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
h1 Add New Menu Item

form(@submit.prevent="doAddMenuItem")
  div
    label(for="name") Name
    input#name(v-model="name")
  div
    label(for="type") Type
    input#type(v-model="type")
  div
    label(for="subType") Sub Type
    input#subType(v-model="subType")
  div
    label(for="price") Price
    input#price(v-model="price")
  div
    button(type="submit") Add Menu Item
</template>
