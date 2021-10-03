
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Todo.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') },
      { path: '/info', component: () => import('pages/Info.vue') },
      { path: '/note', component: () => import('pages/Note.vue') }
    ]
  },
  {
    path: '/weather',
    component: () => import('layouts/WeatherLayout.vue'),
    children: [
      { path: '/weather', component: () => import('pages/Weather.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
