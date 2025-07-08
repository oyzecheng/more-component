import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/sample/pageTable'
  },
  {
    path: '/sample',
    name: 'sample',
    component: () => import('@/layouts/RouterView.vue'),
    redirect: '/pageTable',
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
      },
      {
        path: 'pageTableSeparated',
        name: 'pageTableSeparated',
        component: () => import('@/views/sample/pageTable/separated-config-demo.vue')
      },
      {
        path: 'pageTableTest',
        name: 'pageTableTest',
        component: () => import('@/views/sample/pageTable/test-fix.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
