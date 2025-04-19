import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        { path: 'home', component: () => import('@/views/layout/HomeView.vue') },
        {
          path: 'blog',
          component: () => import('@/views/blog/index.vue'),
          children: [
            { path: 'tags', component: () => import('@/views/blog/Tags.vue') },
            { path: 'archives', component: () => import('@/views/blog/Archives.vue') },
            { path: 'categories', component: () => import('@/views/blog/Categories.vue') }
          ]
        },
        {
          path: 'article',
          component: () => import('@/views/article/index.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/user/index.vue'),
      children: [
        { path: 'personalarticel', component: () => import('@/views/user/PersonalArticle.vue') },
        { path: 'userinfo', component: () => import('@/views/user/UserInfo.vue') },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
})

export default router
