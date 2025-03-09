import { defineStore, acceptHMRUpdate } from 'pinia'

export const useReferencesStore = defineStore('ReferencesStore', {
  state: () => ({}),
  getters: {},
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReferencesStore, import.meta.hot))
}
