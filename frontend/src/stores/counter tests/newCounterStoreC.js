import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNewCounterStoreC = defineStore('newCounterC', () => {
  // unique id is optional
  const count = ref(0) // reactive state
  const doubleCount = computed(() => count.value * 2) // getter that returns count * 2
  function increment() {
    // synchronous mutations
    count.value++ // action that commits the mutation
  }
  function decrement() {
    // synchronous mutations
    count.value-- // action that commits the mutation
  }

  return { count, doubleCount, increment, decrement } // return everything that needs to be exposed
})
