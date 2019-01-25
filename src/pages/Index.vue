<template>
  <q-page padding>
    <div class="row justify-center">
      <img class="center" alt="ANNotate logo" src="~assets/annotate-logo-long-282x92.png">
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 col-lg-8">
        <div class="row no-wrap q-field-floating">
          <q-icon name="keyboard_arrow_right" class="col-auto q-field-icon q-field-margin" />
          <q-field
            id="protein-field"
            class="col q-subheading"
            label=""
            helper="Enter a single protein sequence with or without a header"
            :error="$v.seq.$error"
            :error-label="errorMessages($v.seq)"
          >
            <q-input
              v-model="seq"
              clearable
              autofocus
              float-label="Protein Sequence"
              type="textarea"
              @blur="$v.seq.$touch"
            />
          </q-field>
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <q-btn
        id="predict"
        label="Predict"
        color="primary"
        @click='predict'
      />
    </div>
    <q-input
      v-model="pfamCurrent"
      float-label="Results"
      type="textarea"
    />
  </q-page>
</template>

<style lang="stylus">
#protein-field .q-input
  font-family monospace
//   height 200px
// .q-layout-page > .row + .row
#predict
  margin-top 1.5rem
</style>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import { isProtein } from 'assets/validators'

export default {
  name: 'PageIndex',
  data () {
    return {
      seq: ''
    }
  },
  validations: {
    seq: {
      maxLength: maxLength(50000),
      isProtein: isProtein()
    }
  },
  computed: {
    pfamCurrent () {
      if (!this.$store.getters['pfam/current']) {
        return ''
      } else {
        return this.$store.getters['pfam/current'].predictions[0].classes
      }
    }
  },
  methods: {
    predict () {
      // this.$v.seq.$touch()
      if (!this.seq || this.$v.seq.$error) {
        this.$q.notify('Please enter a valid protein sequence')
        return
      }
      const { Pfam } = this.$FeathersVuex
      const pfam = new Pfam({seq: this.seq})
      pfam.create()
    },
    errorMessages (vState) {
      if (!vState.$error) {
        return ''
      }
      for (let type in vState.$params) {
        if (!vState[type]) {
          if (type === 'apiErrors') {
            return this.$t(this.errors[vState.$params[type].field])
          } else {
            return this.$t(type, vState.$params[type])
          }
        }
      }
    }
  }
}
</script>
