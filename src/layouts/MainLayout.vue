<template>
  <q-layout view="lHh Lpr fff">
    <q-header :class="{ 'transparent text-gray-600': true, 'backdrop-blur-3xl': !isIndexPage }">
      <q-toolbar class="header-toolbar flex h-16 text-gray-900">
        <Transition name="fade">
          <div v-if="!isIndexPage" class="flex items-center">
            <q-btn flat dense round aria-label="Home" :to="{ name: 'index' }" size="xl">
              <q-avatar size="48px"><img src="/favicon-96x96.png" /></q-avatar>
            </q-btn>
            <q-toolbar-title class="title">
              <router-link :to="{ name: 'index' }">
                <div class="brand-section">
                  <q-item-label class="text-h5 brand-name">ANNotate</q-item-label>
                  <q-item-label class="text-subtitle2 brand-subtitle" lines="1">
                    Protein Annotation using Deep Learning
                  </q-item-label>
                </div>
              </router-link>
            </q-toolbar-title>
          </div>
        </Transition>

        <q-space />

        <!-- Navigation links -->
        <div class="min-w-90 items-center max-[700px]:hidden">
          <q-btn flat label="About" :to="{ name: 'about' }" />
          <q-btn flat label="How It Works" :to="{ name: 'how-it-works' }" />
          <q-btn flat label="Contact" :to="{ name: 'contact' }" />
        </div>

        <!-- Mobile menu -->
        <div class="min-[700px]:hidden">
          <q-btn flat dense round aria-label="Menu">
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
        </div>
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
        <!-- <q-select
          v-model="selectedLocale"
          dark
          dense
          hide-dropdown-icon
          emit-value
          map-options
          :options="localeOptions"
          class="locale-select"
        /> -->
        <div class="flex flex-row max-sm:space-x-2 sm:space-x-3">
          <div
            class="h-6 w-6 fill-current hover:text-blue-200 hover:drop-shadow-md dark:hover:text-blue-800"
          >
            <a
              href="https://github.com/hotdogee/annotate-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>GitHub icon</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </a>
          </div>
          <div
            class="h-6 w-6 fill-current hover:text-blue-200 hover:drop-shadow-md dark:hover:text-blue-800"
          >
            <a
              href="https://www.linkedin.com/in/hotdogee/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>LinkedIn icon</title>
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
        </div>
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
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { useLocalSettingsStore } from '../stores/localSettingsStore'
import { useSystemStore } from '../stores/systemStore'

// Router setup
const route = useRoute()

// Store setup
const systemStore = useSystemStore()
// const localSettingsStore = useLocalSettingsStore()
const { version } = storeToRefs(systemStore)
// const { locale, getLocale } = storeToRefs(localSettingsStore)

// Data properties
// const localeOptions = ref([
//   {
//     label: 'English',
//     value: 'en-us',
//   },
//   {
//     label: '繁中',
//     value: 'zh-hant',
//   },
// ])

// Computed properties
// const selectedLocale = computed({
//   get: () => getLocale.value,
//   set: (newLocale) => {
//     locale.value = newLocale
//   },
// })

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
  // margin: 0 1rem;
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
