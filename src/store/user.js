import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async login({name, password}) {
      try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword (auth, name, password)
        this.user = userCredential.user
        localStorage.setItem('isLogin', 'true')
      } catch (error) {
        this.user = null
        console.error(error)
      }
    },
    
    hasUser(user) {
      this.user = user
    },
    
    logout() {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.user = null
        localStorage.setItem('isLogin', 'false')
      }).catch((error) => {
        console.error(error)
      })
    },
  },
  getters: {
    isLogged: (state) => state.user !== null
  }
})
