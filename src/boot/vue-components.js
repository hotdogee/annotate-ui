// import VirtualCollection from 'vue-virtual-collection'
// import Trend from 'vuetrend'
// import Bars from 'vuebars'
import VTooltip from 'v-tooltip'
import vuejsStorage from 'vuejs-storage'

export default ({ app, router, Vue }) => {
  // Vue.use(VirtualCollection)
  // Vue.use(Trend)
  // Vue.use(Bars)
  Vue.use(VTooltip)
  Vue.use(vuejsStorage)
}
