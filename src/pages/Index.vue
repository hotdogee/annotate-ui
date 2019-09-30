<template>
  <q-page padding>
    <div class="row justify-center">
      <img
        class="center"
        alt="ANNotate logo"
        src="~assets/annotate-logo-long-v2-h92.png"
      />
    </div>
    <search-input :seq.sync="seq"></search-input>
    <!-- <q-input
      v-model="pfamCurrent"
      float-label="Results"
      type="textarea"
    />-->
  </q-page>
</template>

<script>
import SearchInput from 'components/SearchInput'

export default {
  name: 'pages.Index',
  components: {
    SearchInput
  },
  data () {
    return {
      seq: ''
    }
  }
}
</script>
