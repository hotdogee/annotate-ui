import { defineBoot } from '#q-app/wrappers'
import { configure } from 'vue-gtag'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot((/* { app, router, ... } */) => {
  configure({
    tagId: process.env.GA_MEASUREMENT_ID || '',
  })
})
