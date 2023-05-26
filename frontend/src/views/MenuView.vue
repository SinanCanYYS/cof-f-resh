<script>
import { mapActions } from 'pinia'
import { useRestaurantStore } from '../stores/restaurant'

export default {
  name: 'MenuView',
  data() {
    return {
      restaurant: {}
    }
  },

  async created() {
    this.restaurant = await this.fetchRestaurant(this.$route.params.id)
  },

  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurant'])
  }
}
</script>

<template lang="pug">
.menu-page
  h1.menu-header
    span Ingredients of&nbsp;
    RouterLink(:to="`/restaurants/${restaurant._id}`")  {{ restaurant.name }}
  .menu-table-wrapper
    table.table.table-bordered.table-hover.table-sm
      thead
        tr
          th.menu-header-text(style="width: 200px") Name
          th.menu-header-text(style="width: 120px") Type
          th.menu-header-text(style="width: 120px%") SubType
          th.menu-header-text(style="width: 100px") Price
          th.menu-header-text(style="width: 400px%") Actions
      tbody
        tr(v-for="item in restaurant.menu" :key="item._id")
          td {{ item.name }}
          td(style="text-align: center") {{ item.type }}
          td(style="text-align: center") {{ item.subType }}
          td.text-end {{ item.price }} €
          td.actions
            button.btn.btn-outline-success.btn-sm.me-2(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)" style="width:80px") Edit
            button.btn.btn-outline-danger.btn-sm.m2-2(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/${item._id}`)" style="width:80px") Delete
    .menu-buttons
      button.btn.btn-outline-warning(@click="$router.push(`/restaurants/${this.$route.params.id}/menu/newmenuitem`)") Add New Menu Item

</template>
<style scoped>
.menu-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-table-wrapper {
  margin-top: 20px;
  max-width: 1000px;
}

.menu-table {
  width: 100%;
}

.menu-table th {
  font-weight: bold;
}
.menu-header-text {
  font-weight: bold;
  text-align: center;
}

.menu-table td.text-right {
  text-align: right;
}
.menu-buttons {
  margin-top: 20px;
  text-align: center;
}
</style>
```
