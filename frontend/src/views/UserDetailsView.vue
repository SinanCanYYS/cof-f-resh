<script>
import axios from 'axios'

export default {
  name: 'UserDetailsViewuser',
  data() {
    return {
      user: null
    }
  },
  async created() {
    const { data: user } = await axios.get(`http://localhost:3000/users/${this.$route.params.id}`)
    this.user = user
  }
}
</script>
<template lang="pug">
h1 User List
p  Welcome to {{user.name}}

h2 User details
p.user {{user.name}} is a {{user.type}}


</template>
