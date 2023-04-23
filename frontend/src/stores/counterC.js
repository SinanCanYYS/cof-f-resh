import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counterO', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// export default {
//   data() {
//     return {
//       count: 0
//     }
//   },
//   computed: {
//     doubleCount() {
//       return this.count * 2
//     }
//   },
//   methods: {
//     increment() {
//       this.count++
//     },
//     decrement() {
//       this.count--

//     },

//   }
// }
