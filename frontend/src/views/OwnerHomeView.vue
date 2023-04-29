<script setup>
import axios from 'axios'

import { RouterLink } from 'vue-router'

const usersResponse = await axios.get('/users?view=json')

const users = usersResponse.data
</script>

<template>
  <div class="users">
    <h1>Owner Home</h1>

    <!-- <ul>
      <li v-for="user in users" :key="user._id">
        <RouterLink :to="`/users/${user._id}`"> {{ user.name }} - {{ user.type }}</RouterLink>
      </li>
    </ul> -->
  </div>
</template>
