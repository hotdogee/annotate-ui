import { defineStore } from 'pinia'
import Logger from 'assets/logger'

const logger = new Logger('stores.localSettings')

export const useLocalSettingsStore = defineStore('localSettings', {
  state: () => ({
    fontSize: 100,
    locale: 'default', // use quasar lang instead of browser navigator.language
  }),

  getters: {
    locale(state) {
      if (!state.locale || state.locale === 'default') {
        return 'en-us'
      } else {
        return state.locale
      }
    },
  },

  actions: {
    setLocale(payload) {
      logger.debug('setLocale', payload)
      this.locale = payload.locale
    },
  },
})
