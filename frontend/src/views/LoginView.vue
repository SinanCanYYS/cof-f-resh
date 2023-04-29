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
      const user = await this.login(this.email, this.password)
      console.log('login successful', user)
      user.type === 'Customer'
        ? this.$router.push('/customerhome')
        : this.$router.push('/ownerhome')
    }
  }
}
</script>

<template lang="pug">
h2 Log-in to cof~f~resh


form(@submit.prevent="doLogin")
  div
    label(for="email") Email:
    input#username(v-model="email" type="text" required)
  div
    label(for="password") Password:
    input#password(v-model="password" type="password" required)

  button(type="submit") Log in


</template>
