import { defineStore } from 'pinia'

// import package.json version
import packageJson from '../../package.json'
const version = packageJson.version

export const useSystemStore = defineStore('system', {
  state: () => ({
    version,
  }),

  getters: {
    // Add getters if needed
  },

  actions: {
    // Add actions if needed
  },
})
