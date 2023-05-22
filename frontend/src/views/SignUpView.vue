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
div.container.d-flex.flex-column.justify-content-center.align-items-center.vh-50
  div(style="margin: auto; text-align: center")
    img(
      src="../../public/coffresh.png"
      alt="A description of your image"
      width="300"
      height="300"
      margin-bottom="200px")
  br
  h4 Sign up to Cof~f~resh
  form(@submit.prevent="doSignUp" style='width: 30%' )
    div.row.mb-3
      .col
        label.form-label(for="username") Username
      .col-9
        input#username.form-control.form-control-sm(v-model="username" type="text" required)
    div.row.mb-3
      .col
        label.form-label(for="email") e-mail
      .col-9
        input#email.form-control.form-control-sm(v-model="email" type="text" required)
    div.row.mb-3
      .col
        label.form-label(for="password") Password
      .col-9
        input#password.form-control.form-control-sm(v-model="password" type="password" required)
    div.row.mb-3.form-check-inline.container-radio
      //- .col
      //-   label.form-label(for="type") Type:
      .row-inline
        .form-check-inline
            input.form-check-input(type="radio" name="type" id="customer" value="Customer" v-model="type")
            label.form-check-label(for="customer") Customer
        .form-check-inline
            input.form-check-input(type="radio" name="type" id="owner" value="Owner" v-model="type")
            label.form-check-label(for="owner") Owner
        //- b-form-radio-group#type.form-control-sm(v-model="type")
        //-   b-form-radio(value="Customer") Customer
        //-   b-form-radio(value="Owner") Owner
        //- select#type.from-control.form-control-sm(v-model="type")
        //-   option(value="Customer") Customer
        //-   option(value="Owner") Owner
      //- input#type(v-model="type" type="text" required)
    .row
      button.btn.btn-outline-warning#submit(type="submit") Sign up
</template>
<style scoped>
.container-radio {
  width: 100%;
  text-align: center;
}
</style>
```
