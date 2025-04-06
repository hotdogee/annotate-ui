import { defineStore } from 'pinia'

export const useLocalSettingsStore = defineStore('localSettings', {
  state: () => ({
    fontSize: 100,
    locale: 'default', // use quasar lang instead of browser navigator.language
  }),

  getters: {
    getLocale(state) {
      if (!state.locale || state.locale === 'default') {
        return 'en-us'
      } else {
        return state.locale
      }
    },
  },

  actions: {},
})
