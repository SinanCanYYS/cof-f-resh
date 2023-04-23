<script>
import { useNewCounterStoreO } from '../stores/newCounterStoreO.js'
import { computed } from 'vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NewCounterFromStoreCO',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const counterStore = useNewCounterStoreO()
    const count = ref(counterStore.count)
    const increment = () => {
      counterStore.increment()
      count.value = counterStore.count
    }
    const decrement = () => {
      counterStore.decrement()
      count.value = counterStore.count
    }
    const doubleCount = computed(() => counterStore.doubleCount)

    return { count, increment, decrement, doubleCount }
  }
})
</script>
<template lang="pug">
div
  h1 {{ name }}
  p Count: {{ count }}
  p Double Count: {{ doubleCount }}
  button(@click='increment') Increment
  button(@click='decrement') Decrement
</template>
