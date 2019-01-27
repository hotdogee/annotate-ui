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
export default {
  name: 'PfamDetail',
  data () {
    return {
      seq: ''
    }
  },
  computed: {
    pfamClasses () {
      if (!this.$store.getters['pfam/current']) {
        return ''
      } else {
        return this.$store.getters['pfam/current'].predictions[0].classes
      }
    }
  },
  methods: {

  }
}
</script>
