import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0
  }),

  // state() {=>({count: 0})} is equivalent to:
  // state: () => { return { count: 0 } },

  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
