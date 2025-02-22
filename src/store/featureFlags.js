import { defineStore } from 'pinia'
import { collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { daysDifferenceFromMidnight } from '../utils/index.js'

export const useFeatureFlagsStore = defineStore('featureFlags', {
  state: () => ({
    featureFlags: null,
  }),
  actions: {
    async getFeatureFlags(update = false) {
      if (!update) {
        const featureFlagsLocalStorage = localStorage.getItem('featureFlags')
        const lastUpdateLocalStorage = localStorage.getItem('featureFlagsLastUpdate')
        if(featureFlagsLocalStorage && lastUpdateLocalStorage) {
          const lastUpdateDate = new Date(lastUpdateLocalStorage)
          const now = new Date()
          const diffInDays = daysDifferenceFromMidnight(lastUpdateDate, now)
          if (diffInDays < 1) {
            this.featureFlags = JSON.parse(featureFlagsLocalStorage)
            return
          }
        }
      }
      const featureFlagsCollection = collection(db, 'featureFlags')
      const featureFlagsSnapshot = await getDocs(featureFlagsCollection)
      this.featureFlags = {}
      featureFlagsSnapshot.forEach((doc) => {
        this.featureFlags[doc.id] = doc.data()
      })
      
      localStorage.setItem('featureFlags', JSON.stringify(this.featureFlags))
      localStorage.setItem('featureFlagsLastUpdate', new Date().toISOString())
    },
    async getFlagValue(flagKey, defaultValue = false) {
      const featureFlags = await this.featureFlags
      if (!featureFlags) {
        console.warn('Feature flags not loaded yet')
        return defaultValue
      }

      for (const flag of Object.values(featureFlags)) {
        if (flag.hasOwnProperty(flagKey)) {
          return flag[flagKey]
        }
      }
      return defaultValue
    }
  }
})
