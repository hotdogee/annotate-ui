<template>
  <q-layout view="lHh Lpr fff">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="false"
        :inverted="false"
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

        <q-toolbar-title @click.native="$router.push('/')">
          ANNotate
          <div slot="subtitle">Protein Annotation using Neural Networks</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>ANNotate</q-list-header>
        <q-item @click.native="openURL('')">
          <q-item-side icon="school" />
          <q-item-main label="" sublabel="" />
        </q-item>
        <q-item @click.native="openURL('')">
          <q-item-side icon="code" />
          <q-item-main label="" sublabel="" />
        </q-item>
        <q-item @click.native="openURL('')">
          <q-item-side icon="chat" />
          <q-item-main label="" sublabel="" />
        </q-item>
        <q-item @click.native="openURL('')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="" sublabel="" />
        </q-item>
        <q-item @click.native="openURL('')">
          <q-item-side icon="rss feed" />
          <q-item-main label="" sublabel="" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-layout-footer>
      <q-toolbar color="dark">
        <q-toolbar-title>
          <small class="text-grey-5">Made with <span class="text-red-14">❤</span> by Han Lin <span class="gt-xs">(hotdogee)</span></small>
        </q-toolbar-title>
        <q-toolbar-title>
          <small class="text-grey-5 float-right">© {{ new Date().getFullYear() }}</small>
        </q-toolbar-title>
        <q-select
          dark
          v-model="lang"
          :options="langOptions"
        />
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
// It will take care of the quirks involved when running under Cordova or on a
// browser, including notifying the user he/she has to acknowledge opening popups.

export default {
  name: 'MyLayout',
  data () {
    return {
      lang: this.$q.i18n.lang,
      langOptions: [
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
  methods: {
    openURL
  }
}
</script>

<style>
</style>
