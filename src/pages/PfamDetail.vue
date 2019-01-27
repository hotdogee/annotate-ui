<template>
  <q-page padding>
    <div class="row justify-center">
      <img class="center" alt="ANNotate logo" src="~assets/annotate-logo-long-282x92.png">
    </div>
    <q-input
      v-model="pfamClasses"
      float-label="Classes"
      type="textarea"
    />
    <q-input
      v-model="pfamDomainMap"
      float-label="DomainMap"
      type="textarea"
    />
    <q-input
      v-model="pfamTopClasses"
      float-label="TopClasses"
      type="textarea"
    />
    <q-input
      v-model="pfamTopProbs"
      float-label="TopProbs"
      type="textarea"
    />
  </q-page>
</template>

<style lang="stylus">
// #protein-field .q-input
//   font-family monospace
// //   height 200px
// // .q-layout-page > .row + .row
// #predict
//   margin-top 1.5rem
// #example-btn
//   margin-top 21px
//   margin-right 5px
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PfamDetail',
  data () {
    return {
      seq: ''
    }
  },
  created () {
    // fetch the data when the view is created
    if (!this.current || this.current._id !== this.$route.params.id) {
      const { Pfam } = this.$FeathersVuex
      Pfam.get(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters('pfam', { current: 'current' }),
    pfamClasses () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.predictions[0].classes, null, '')
      }
    },
    pfamTopClasses () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.predictions[0].top_classes, null, '')
      }
    },
    pfamTopProbs () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.predictions[0].top_probs, null, '')
      }
    },
    pfamDomainMap () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.domainMap, null, '')
      }
    }
  },
  methods: {

  }
}
</script>
