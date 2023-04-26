<script>
import axios from 'axios'
import NewCounterO from '@/components/NewCounterO.vue'

export default {
  name: 'UserDetailsViewuser',
  components: {
    NewCounterO
  },
  data() {
    return {
      user: null
    }
  },
  async created() {
    const { data: user } = await axios.get(`/users/${this.$route.params.id}`)
    this.user = user
  }
}
</script>
<template lang="pug">
h1 User List
NewCounterO(name = 'NewCounterO')
NewCounterO(name = 'NewCounter1')
p  Welcome to {{user.name}}

h2 User details
p.user {{user.name}} is a {{user.type}}


</template>
