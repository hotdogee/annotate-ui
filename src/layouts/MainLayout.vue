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

<script>
import { openURL } from 'quasar'
import { useSystemStore } from '../stores/systemStore'
import { useLocalSettingsStore } from '../stores/localSettingsStore'
import { storeToRefs } from 'pinia'
import Logger from 'assets/logger'
const logger = new Logger('layouts.MainLayout')

export default {
  name: 'MainLayout',
  data() {
    return {
      localeOptions: [
        {
          label: 'English',
          value: 'en-us',
        },
        {
          label: '繁中',
          value: 'zh-hant',
        },
      ],
      showUserForm: 'sign-in',
      leftDrawerOpen: false,
      credentials: {
        email: '',
        password: '',
        recaptchaToken: '',
        disableGoogle: true,
        disableFacebook: true,
        disableTwitter: true,
      },
    }
  },
  setup() {
    const systemStore = useSystemStore()
    const localSettingsStore = useLocalSettingsStore()

    const { version, status } = storeToRefs(systemStore)
    const { locale } = storeToRefs(localSettingsStore)

    return {
      version,
      status,
      locale,
      localSettingsStore,
    }
  },
  computed: {
    selectedLocale: {
      get() {
        return this.locale
      },
      set(locale) {
        logger.debug(`locale.set = `, locale)
        this.localSettingsStore.setLocale({ locale })
      },
    },
  },
  created() {
    this.$info('created')
  },
  methods: {
    openURL,
  },
}
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
