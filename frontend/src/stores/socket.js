import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const socket = io('http://127.0.0.1:3000', {
  withCredentials: true
})

export const useSocketStore = defineStore('Socket', {
  state: () => ({
    connected: false
  }),
  actions: {
    init() {
      socket.on('connect', () => {
        this.connected = true
        console.log('connected')
      })

      socket.on('disconnect', () => {
        this.connected = false
        console.log('disconnected')
      })
      socket.on('orderCreated', (data) => {
        console.log('Socket Order created (frontend):', data)
        // Perform any desired actions with the received data
        // For example, update the restaurant owner's UI or display a notification
      })
      console.log('Socket Order created (frontend test):')
    }
  }
})
