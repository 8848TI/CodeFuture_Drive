import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        { path: '/home', component: () => import('@/views/layout/HomeView.vue') },
        {
          path: '/blog',
          component: () => import('@/views/blog/index.vue'),
          children: [
            { path: '/blog/tags', component: () => import('@/views/blog/tags.vue') },
            { path: '/blogs/archives', component: () => import('@/views/blog/archives.vue') },
            { path: '/blogs/categories', component: () => import('@/views/blog/categories.vue') }
          ]
        },
        {
          path: '/article',
          component: () => import('@/views/article/index.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/user/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
})

export default router
