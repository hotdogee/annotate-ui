<template>
  <q-layout view="lHh Lpr fff">
    <q-header elevated class="">
      <q-toolbar color="primary">
        <q-btn flat dense round aria-label="Home" @click="$router.push('/')">
          <q-icon name="home" />
        </q-btn>

        <q-toolbar-title class="title">
          <q-item-label>ANNotate</q-item-label>
          <q-item-label class="text-caption" lines="1">
            Protein Annotation using Neural Networks
          </q-item-label>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated class="text-overline text-grey-5 bg-grey-9">
      <q-toolbar>
        <q-item-section>
          <q-item-label lines="1">
            Made with <span class="text-red-14">❤</span> by Han Lin (hotdogee)
          </q-item-label>
          <q-item-label class="text-caption" lines="1">
            {{ version.ui }}
          </q-item-label>
        </q-item-section>
        <q-space></q-space>
        <div class="copyright">© {{ new Date().getFullYear() }}</div>
        <q-select
          v-model="selectedLocale"
          dark
          dense
          hide-dropdown-icon
          emit-value
          map-options
          :options="localeOptions"
        />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { openURL } from 'quasar'
import { useSystemStore } from '../stores/systemStore'
import { useLocalSettingsStore } from '../stores/localSettingsStore'
import { storeToRefs } from 'pinia'

// Store setup
const systemStore = useSystemStore()
const localSettingsStore = useLocalSettingsStore()
const { version } = storeToRefs(systemStore)
const { locale, getLocale } = storeToRefs(localSettingsStore)

// Data properties
const localeOptions = ref([
  {
    label: 'English',
    value: 'en-us',
  },
  {
    label: '繁中',
    value: 'zh-hant',
  },
])

// Computed properties
const selectedLocale = computed({
  get: () => getLocale.value,
  set: (newLocale) => {
    locale.value = newLocale
  },
})

// Lifecycle hooks
onMounted(() => {
  // console.info('MainLayout mounted')
})

defineExpose({
  openURL,
})
</script>

<style>
.copyright {
  min-width: 4.041rem;
  white-space: nowrap;
  overflow: hidden;
}
.title {
  line-height: 2rem;
  font-size: 1.125rem;
}
.title .text-caption {
  margin-top: 0px;
}
</style>
