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
      path: '/admin',
      component: () => import('@/views/admin/index.vue'),
      children: [
        { path: '', component: () => import('@/views/admin/HomeManagement.vue') },
        { path: 'blogmanagement', component: () => import('@/views/admin/BlogManagement.vue') },
        { path: 'categorymanagement', component: () => import('@/views/admin/CategoryManagement.vue') },
        { path: 'reviewsmanagement', component: () => import('@/views/admin/ReviewsManagement.vue') },
        { path:'usermanagement', component: () => import('@/views/admin/UserManagement.vue') }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
})

export default router
