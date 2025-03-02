import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: () => ({
    version: {
      ui: 'v0',
      sw: 'v0',
    },
    status: {
      sw: 'unsupported',
      push: 'unsupported',
    },
  }),

  getters: {
    // Add getters if needed
  },

  actions: {
    // Add actions if needed
  },
})
