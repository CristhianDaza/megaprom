import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login({name, password}) {
      try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword (auth, name, password)
        this.user = userCredential.user
      } catch (error) {
        this.user = null
        console.error(error)
      }
    },
    
    hasUser(user) {
      this.user = user
    }
  },
  getters: {
    isLogged: (state) => state.user !== null,
  }
})
