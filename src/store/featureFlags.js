import { defineStore } from 'pinia'
import { collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'

export const useFeatureFlagsStore = defineStore('featureFlags', {
  state: () => ({
    featureFlags: [],
  }),
  actions: {
    async getFeatureFlags() {
      const featureFlagsCollection = collection(db, 'featureFlags')
      const featureFlagsSnapshot = await getDocs(featureFlagsCollection)
      this.featureFlags = featureFlagsSnapshot.docs.map(doc => doc.data())
    }
  }
})
