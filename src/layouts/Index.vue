<template>
  <q-layout view="lHh Lpr fff">
    <q-header class="bg-white text-grey-9">
      <q-toolbar
        color="primary"
        elevated
      >
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click.native="$router.push('/')"
        >
          <q-icon name="home" />
        </q-btn>

        <q-toolbar-title
          class="title"
          @click.native="$router.push('/')"
        >
          <q-item-label>ANNotate</q-item-label>
          <q-item-label caption>
            Protein Annotation using Neural Networks
          </q-item-label>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer
      elevated
      class="text-overline"
    >
      <q-toolbar color="dark">
        <div class="ellipsis">
          Made with
          <span class="text-red-14">❤</span> by Han Lin (hotdogee)
        </div>
        <q-space></q-space>
        <div class="copyright">
          © {{ new Date().getFullYear() }}
        </div>
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
// It will take care of the quirks involved when running under Cordova or on a
// browser, including notifying the user he/she has to acknowledge opening popups.
// import { mapState, mapActions, mapGetters } from 'vuex'
import { mapState, mapGetters, mapMutations } from 'vuex'
import Logger from 'assets/logger'
const logger = new Logger('layouts.Index')

export default {
  name: 'layouts.Index',
  data () {
    return {
      localeOptions: [
        {
          label: 'English',
          value: 'en-us'
        },
        {
          label: '繁中',
          value: 'zh-hant'
        }
      ],
      showUserForm: 'sign-in',
      leftDrawerOpen: false,
      credentials: {
        email: '',
        password: '',
        recaptchaToken: '',
        disableGoogle: true,
        disableFacebook: true,
        disableTwitter: true
      }
    }
  },
  computed: {
    ...mapState('system', ['version', 'status']),
    ...mapGetters('localSettings', ['locale']),
    selectedLocale: {
      get: function () {
        return this.locale
      },
      set: function (locale) {
        logger.debug(`locale.set = `, locale)
        this.setLocale({ locale })
      }
    }
  },
  created () {
    this.$info('created') //  ${__filename}
  },
  methods: {
    openURL,
    ...mapMutations('localSettings', ['setLocale'])
  }
}
</script>

<style>
.copyright {
  min-width: 7.041rem;
  white-space: nowrap;
  overflow: hidden;
}
.title {
  line-height: 2rem;
  font-size: 1.125rem;
}
</style>
