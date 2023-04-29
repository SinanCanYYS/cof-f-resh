<script>
import axios from 'axios'
import { useUserStore } from '../stores/user'
import { mapActions } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'SignUpView',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      type: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signup']),
    async doSignUp() {
      await this.signup(this.username, this.email, this.password, this.type)
      this.$router.push('/users')
    }
  }
}
</script>

<template lang="pug">
h2 Sign up to Cof~f~resh

  form(@submit.prevent="doSignUp")
    div
      label(for="username") Username :
      input#username(v-model="username" type="text" required)
    div
      label(for="email") e-mail        :
      input#email(v-model="email" type="text" required)
    div
      label(for="password") Password:
      input#password(v-model="password" type="password" required)
    div
      label(for="type") Type:
      select#type(v-model="type")
        option(value="Customer") Customer
        option(value="Owner") Owner
      //- input#type(v-model="type" type="text" required)
    button#submit(type="submit") Sign up
</template>
