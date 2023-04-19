<script setup>
import axios from 'axios'

import { RouterLink } from 'vue-router'

import Counter from '../components/Counter.vue'
import CounterOptionsApi from '../components/CounterOptionsApi.vue'

// const { data: users } = await axios.get('http://localhost:3000/users?view=json')

const usersResponse = await axios.get('http://localhost:3000/users?view=json')

const users = usersResponse.data
</script>

<template>
  <div class="users">
    <h1>Users</h1>
    <!-- <Counter name="Kahveci" />
    <Counter name="Yemekci" />
    <CounterOptionsApi name="Tek" />
    <CounterOptionsApi name="Grup" /> -->
    <ul>
      <li v-for="user in users" :key="user._id">
        <a :href="`/users/${user._id}`"> {{ user.name }} - {{ user.type }} - {{ user._id }}</a>
      </li>
    </ul>
  </div>
</template>
