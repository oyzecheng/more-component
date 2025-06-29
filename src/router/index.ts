import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/sample/pageForm'
  },
  {
    path: '/sample',
    name: 'sample',
    component: () => import('@/layouts/RouterView.vue'),
    redirect: '/pageForm',
    children: [
      {
        path: 'pageForm',
        name: 'pageForm',
        component: () => import('@/views/sample/pageForm/index.vue')
      },
      {
        path: 'pageTable',
        name: 'pageTable',
        component: () => import('@/views/sample/pageTable/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router