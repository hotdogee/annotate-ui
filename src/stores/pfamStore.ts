import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePfamStore = defineStore('PfamStore', {
  state: () => ({}),
  getters: {},
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePfamStore, import.meta.hot))
}
