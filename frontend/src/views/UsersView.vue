<script setup>
import axios from 'axios'

import { RouterLink } from 'vue-router'

import NewCounterC from '../components/NewCounterC.vue'
import NewCounterO from '../components/NewCounterO.vue'
import NewCounterFromStoreOC from '../components/NewCounterFromStoreOC.vue'
import NewCounterFromStoreCC from '../components/NewCounterFromStoreCC.vue'
import NewCounterFromStoreOO from '../components/NewCounterFromStoreOO.vue'
import NewCounterFromStoreCO from '../components/NewCounterFromStoreCO.vue'
// import Counter from '../components/Counter.vue'
// import CounterOptionsApi from '../components/CounterOptionsApi.vue'

// const { data: users } = await axios.get('/users?view=json')

const usersResponse = await axios.get('/users?view=json')

const users = usersResponse.data
</script>

<template>
  <div class="users">
    <h1>Users</h1>
    <NewCounterFromStoreOC name="Coffee-OC" />
    <NewCounterFromStoreCC name="Food-CC" />
    <NewCounterFromStoreOO name="Coffee-OO" />
    <NewCounterFromStoreCO name="Food-CO" />
    <!-- <NewCounterC name="Coffee-C" />
    <NewCounterC name="Food-C" />
    <NewCounterO name="Coffee - O" />
    <NewCounterO name="Food - O" /> -->
    <!-- <Counter name="Coffee-C" />
    <Counter name="Food-C" />
    <CounterOptionsApi name="Coffee-OC" />
    <CounterOptionsApi name="Food-OC" /> -->
    <ul>
      <li v-for="user in users" :key="user._id">
        <RouterLink :to="`/users/${user._id}`"> {{ user.name }} - {{ user.type }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
