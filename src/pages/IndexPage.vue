<template>
  <q-page padding>
    <div class="row justify-center">
      <img class="center" alt="ANNotate logo" src="~assets/annotate-logo-long-v2-h92.png" />
    </div>
    <search-input v-model:seq="seq"></search-input>
    <!-- <q-input
      v-model="pfamCurrent"
      float-label="Results"
      type="textarea"
    />-->
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import SearchInput from 'components/SearchInput.vue'

const seq = ref('')
</script>
