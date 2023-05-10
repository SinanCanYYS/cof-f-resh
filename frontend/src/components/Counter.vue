<script setup>
import { ref } from 'vue'
defineProps({
  name: {
    type: String,
    required: true
  }
})
const count = ref(0)
const increment = () => {
  count.value++
}
const decrement = () => {
  count.value--
}
</script>

<template lang="pug">
div(style="display: flex; flex-wrap: wrap;")
  button(@click='decrement') -
  p Qty: {{ count }}
  button(@click='increment') +
</template>
