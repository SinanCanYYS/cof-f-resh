<script>
import { useCounterStore } from '../stores/counterC'
// import { mapState, mapActions } from 'pinia'

export default {
  name: 'Counter',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const counterStore = useCounterStore()
    return { counterStore }
  }
}
</script>

<template lang="pug">
div
  h1 {{ name }}
  p Count: {{ counterStore.count }}
  button(@click='counterStore.increment') +
  button(@click='counterStore.decrement') -
</template>
