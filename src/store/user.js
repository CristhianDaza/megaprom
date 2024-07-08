import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loginStatus: ''
  }),
  actions: {
    async login({name, password}) {
      try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword (auth, name, password)
        this.user = userCredential.user
        this.$patch((state) => {
          state.loginStatus = 'success'
        })
        localStorage.setItem('isLogin', 'true')
      } catch (error) {
        this.user = null
        this.$patch((state) => {
          state.loginStatus = 'error'
        })
        console.error(error)
        localStorage.setItem('isLogin', 'false')
      }
    },
    
    resetLoginStatus() {
      this.$patch((state) => {
        state.loginStatus = ''
      })
    },
    
    hasUser(user) {
      this.user = user
    },
    
    logout() {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.user = null
        this.$patch((state) => {
          state.loginStatus = 'logout'
        })
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
