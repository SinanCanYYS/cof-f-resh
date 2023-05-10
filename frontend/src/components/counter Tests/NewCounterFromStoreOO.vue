<script>
import { useNewCounterStoreO } from '../stores/newCounterStoreO.js'
import { computed } from 'vue'

export default {
  name: 'NewCounterFromStoreOO',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const counterStore = useNewCounterStoreO()

    const count = computed(() => counterStore.count)

    const increment = () => {
      counterStore.increment()
    }
    const decrement = () => {
      counterStore.decrement()
    }
    const doubleCount = computed(() => counterStore.doubleCount)

    return { count, increment, decrement, doubleCount }
  }
}
</script>
<template lang="pug">
div
  h1 {{ name }}
  p Count: {{ count }}
  p Double Count: {{ doubleCount }}
  button(@click='increment') Increment
  button(@click='decrement') Decrement
</template>
