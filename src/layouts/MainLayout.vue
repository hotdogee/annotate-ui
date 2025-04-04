<template>
  <q-layout view="lHh Lpr fff">
    <q-header :class="{ 'transparent text-gray-600': true, 'backdrop-blur-3xl': !isIndexPage }">
      <q-toolbar class="header-toolbar h-16 text-gray-900">
        <q-btn
          v-if="!isIndexPage"
          flat
          dense
          round
          aria-label="Home"
          :to="{ name: 'index' }"
          size="xl"
        >
          <q-avatar size="48px"><q-img src="/favicon-96x96.png" /></q-avatar>
        </q-btn>
        <q-toolbar-title class="title" v-if="!isIndexPage">
          <div class="brand-section">
            <q-item-label class="text-h5 brand-name">ANNotate</q-item-label>
            <q-item-label class="text-subtitle2 brand-subtitle" lines="1">
              Protein Annotation using Neural Networks
            </q-item-label>
          </div>
        </q-toolbar-title>

        <q-space />

        <!-- Navigation links -->
        <div class="gt-xs">
          <q-btn flat label="About" :to="{ name: 'about' }" />
          <q-btn flat label="How It Works" :to="{ name: 'how-it-works' }" />
          <q-btn flat label="Contact" :to="{ name: 'contact' }" />
        </div>

        <!-- Mobile menu -->
        <q-btn flat dense round class="lt-sm" aria-label="Menu">
          <q-icon name="menu" />
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable :to="{ name: 'about' }">
                <q-item-section avatar>
                  <q-icon name="info" />
                </q-item-section>
                <q-item-section>About</q-item-section>
              </q-item>
              <q-item clickable :to="{ name: 'how-it-works' }">
                <q-item-section avatar>
                  <q-icon name="description" />
                </q-item-section>
                <q-item-section>How It Works</q-item-section>
              </q-item>
              <q-item clickable :to="{ name: 'contact' }">
                <q-item-section avatar>
                  <q-icon name="mail" />
                </q-item-section>
                <q-item-section>Contact</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer elevated class="footer">
      <q-toolbar class="footer-toolbar">
        <q-item-section class="creator-section">
          <q-item-label lines="1" class="creator-text">
            Made with <span class="heart">❤</span> by Han Lin (hotdogee)
          </q-item-label>
        </q-item-section>
        <q-space />
        <div class="copyright">© {{ new Date().getFullYear() }}</div>
        <q-select
          v-model="selectedLocale"
          dark
          dense
          hide-dropdown-icon
          emit-value
          map-options
          :options="localeOptions"
          class="locale-select"
        />
      </q-toolbar>
    </q-footer>

    <q-page-container class="page-container" :style="pageContainerStyle">
      <router-view v-slot="{ Component }">
        <transition :name="route.meta.transition as string">
          <component :is="Component" class="w-full" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { openURL } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalSettingsStore } from '../stores/localSettingsStore'
import { useSystemStore } from '../stores/systemStore'

// Router setup
const route = useRoute()

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

// Check if the current route is showing IndexPage
const isIndexPage = computed(() => {
  return route.path === '/' || route.path === '/pfam'
})

// Apply padding-top: 0px style only for IndexPage
const pageContainerStyle = computed(() => {
  return isIndexPage.value ? { 'padding-top': '0px' } : { 'padding-top': '0px' }
})

// Lifecycle hooks
onMounted(() => {
  console.log(`ANNotate v${version.value}`)
})

defineExpose({
  openURL,
})
</script>

<style lang="scss">
.header-toolbar {
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.brand-section {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
}

.brand-name {
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  opacity: 0.9;
  font-weight: 400;
  margin: 0;
  line-height: 1.2;
}

.footer {
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
}

.footer-toolbar {
  padding: 0.75rem 1.5rem;
}

.creator-section {
  opacity: 0.9;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

.creator-text {
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.heart {
  color: #ff4081;
  display: inline-block;
  animation: heartbeat 1.5s ease infinite;
}

.copyright {
  min-width: 4.041rem;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0.8;
  margin: 0 1rem;
}

.locale-select {
  min-width: 80px;
  opacity: 0.9;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

.page-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}
</style>
