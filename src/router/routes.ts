import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'pfam/:id', name: 'pfam', component: () => import('pages/PfamDetail.vue') },
      { path: 'pfam', component: () => import('pages/IndexPage.vue') },
      { path: 'about', name: 'about', component: () => import('pages/AboutPage.vue') },
      {
        path: 'how-it-works',
        name: 'how-it-works',
        component: () => import('pages/HowItWorksPage.vue'),
      },
      { path: 'contact', name: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
