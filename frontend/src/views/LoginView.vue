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
      console.log('test August')
      user.type === 'Customer'
        ? this.$router.push('/customerhome')
        : this.$router.push('/ownerhome')
    }
  }
}
</script>

<template lang="pug">
div.container.d-flex.flex-column.justify-content-center.align-items-center.vh-50
  div(style="margin: auto; text-align: center")
    img(
      src="../../public/coffresh.png"
      alt="A description of your image"
      width="300"
      height="300"
      margin-bottom="200px")
  br
  h4 Log-in to cof~f~resh
  form(@submit.prevent="doLogin" style='width: 30%')
    .row.mb-3
      .col
        label.form-label(for="email") e-mail
      .col-9
        input.form-control#username(v-model="email" type="text" required)
    .row.mb-3
      .col
        label.form-label(for="password") Password
      .col-9
        input.form-control#password(v-model="password" type="password" required)
    .row
      button.btn.btn-outline-warning#submit(type="submit") Log in


</template>
