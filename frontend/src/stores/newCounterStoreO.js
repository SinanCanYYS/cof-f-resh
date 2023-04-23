import { defineStore } from 'pinia' // for stores
import { computed } from 'vue' // for getters

export const useNewCounterStoreO = defineStore({
  id: 'newCounterO', // unique id
  state: () => ({
    // reactive state
    count: 0 // default value
  }),
  // optional getters
  actions: {
    // synchronous mutations
    increment() {
      // action that commits the mutation
      this.count++ // `this` is the store instance
    },
    decrement() {
      // action that commits the mutation
      this.count-- // `this` is the store instance
    }
  },
  // computed: {
  //   // synchronous getters
  //   doubleCount: computed(() => this.count * 2), // getter that returns count * 2
  //   tripleCount: (state) => state.count * 3 // getter that returns count * 3
  // }
  getters: {
    // synchronous getters
    doubleCount(state) {
      return state.count * 2
    }, // getter that returns count * 2
    tripleCount(state) {
      return state.count * 3
    } // getter that returns count * 3
  }
})
