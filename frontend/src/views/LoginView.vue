<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapActions } from 'pinia'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
      this.$router.push('/users')
    }
    // async login() {
    //   const response = await axios.post('/accounts/session', {
    //     email: this.email,
    //     password: this.password
    //   })

    //   const user = response.data
    // }
  }
}
</script>

<template lang="pug">
h2 Log-in to cof~f~resh

//- p(v-if="user") You are logged in as {{ user?.name }}

form(@submit.prevent="doLogin")
  div
    label(for="email") Email:
    input#username(v-model="email" type="text" required)
  div
    label(for="password") Password:
    input#password(v-model="password" type="password" required)

  button(type="submit") Log in


</template>
