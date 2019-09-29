const routes = [
  {
    path: '/',
    component: () => import('layouts/Index.vue'),
    children: [
      { path: 'pfam/:id', component: () => import('pages/PfamDetail.vue') },
      { path: 'pfam', component: () => import('pages/Index.vue') },
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
