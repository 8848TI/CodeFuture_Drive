import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/module/user' // 引入用户状态管理

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        { 
          path: 'home', 
          component: () => import('@/views/layout/HomeView.vue'),
          meta: { roles: ['user', 'admin'] } // 允许用户和管理员访问
        },
        {
          path: 'blog',
          component: () => import('@/views/blog/index.vue'),
          children: [
            { 
              path: 'tags', 
              component: () => import('@/views/blog/Tags.vue'),
              meta: { roles: ['user', 'admin'] } 
            },
            { 
              path: 'archives', 
              component: () => import('@/views/blog/Archives.vue'),
              meta: { roles: ['user', 'admin'] } 
            },
            { 
              path: 'categories', 
              component: () => import('@/views/blog/Categories.vue'),
              meta: { roles: ['user', 'admin'] } 
            }
          ]
        },
        {
          path: 'article',
          component: () => import('@/views/article/index.vue'),
          meta: { roles: ['user', 'admin'] } 
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/user/index.vue'),
      children: [
        { 
          path: 'personalarticel', 
          component: () => import('@/views/user/PersonalArticle.vue'),
          meta: { roles: ['user'] } // 仅允许用户访问
        },
        { 
          path: 'userinfo', 
          component: () => import('@/views/user/UserInfo.vue'),
          meta: { roles: ['user'] } 
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/index.vue'),
      children: [
        { 
          path: '', 
          component: () => import('@/views/admin/HomeManagement.vue'),
          meta: { roles: ['admin'] } // 仅允许管理员访问
        },
        { 
          path: 'blogmanagement', 
          component: () => import('@/views/admin/BlogManagement.vue'),
          meta: { roles: ['admin'] } 
        },
        { 
          path: 'categorymanagement', 
          component: () => import('@/views/admin/CategoryManagement.vue'),
          meta: { roles: ['admin'] } 
        },
        { 
          path: 'reviewsmanagement', 
          component: () => import('@/views/admin/ReviewsManagement.vue'),
          meta: { roles: ['admin'] } 
        },
        { 
          path:'usermanagement', 
          component: () => import('@/views/admin/UserManagement.vue'),
          meta: { roles: ['admin'] } 
        }
      ]
    },
    {
      path: '/addarticle',
      component: () => import('@/views/user/AddArticle.vue'),
      meta: { roles: ['user', 'admin'] } 
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue')
    }
  ],
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const requiredRoles = to.meta.roles
  const isLoggedIn = userStore.isLoggedIn

  // 如果用户已经登录且尝试访问登录页面，重定向到首页
  if (isLoggedIn && to.path === '/login') {
    next('/')
    return
  }

  // 如果路由需要权限
  if (requiredRoles) {
    // 未登录，重定向到登录页
    if (!isLoggedIn) {
      next('/login')
      return
    }

    // 检查用户是否有访问权限
    const hasRole = requiredRoles.includes(userStore.userInfo.role)
    if (hasRole) {
      next()
    } else {
      next('/') // 没有权限，重定向到首页
    }
  } else {
    next() // 没有设置权限，直接放行
  }
})

export default router
