<script>
import { useNewCounterStoreC } from '../stores/newCounterStoreC.js'
import { computed } from 'vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NewCounterFromStoreOC',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const counterStore = useNewCounterStoreC()

    const count = computed(() => counterStore.count)
    // why not count = counterStore.count?

    const increment = () => {
      counterStore.increment()
    }
    const decrement = () => {
      counterStore.decrement()
    }
    const doubleCount = computed(() => counterStore.doubleCount)

    return { count, increment, decrement, doubleCount }
  }
})

// const store = newCounterStoreC()
</script>
<template lang="pug">
div
  h1 {{ name }}
  p Count: {{ count }}
  p Double Count: {{ doubleCount }}
  button(@click='increment') Increment
  button(@click='decrement') Decrement
</template>
