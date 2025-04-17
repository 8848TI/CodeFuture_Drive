<script setup>
import { RouterView,useRoute } from 'vue-router'
import BlogEntryPreview from '@/components/BlogEntryPreview.vue'
import { ref, watch } from 'vue'
import Pagination from '@/components/BlogPagination.vue'
import { useBlogRoute } from '@/stores/index'
import FooterInfo from '../../components/FooterInfo.vue'
import GoTop from '@/components/GoTop.vue'

// 同过监听导航来控制是否显示三级路由
const blogRoute = useBlogRoute()
const route = useRoute()

// 监听路由变化
watch(() => route.fullPath, (newPath) => {
  newPath === '/blog' ? blogRoute.setFlag(false) : blogRoute.setFlag(true)
})
</script>

<template>
  <div id="blog">
    <main class="container">
      <div class="row">
        <!-- 三级路由出口 -->
        <RouterView class="col-lg-9" v-if="blogRoute.flag"/>
        <!-- 瀑布流布局 -->
        <div class="col-lg-9 masonry-layout" v-else>
          <BlogEntryPreview v-for="i in 10" :key="i"
            title="Vue 3 入门指南"
            author="张三"
            date="2025-04-14"
            excerpt="本指南将带你快速了解 Vue 3 的新特性和基本用法。"
            imageUrl="../../assets/images/07.jpg"
          />
          <!-- 分页功能开始 -->
          <Pagination class="col-lg-9"/>
          <!-- 分页功能结束 -->
        </div>
        <!-- 右侧固定栏开始 -->
        <div class="col-lg-3 right">
          <div class="aside">
            <!-- 介绍区域开始 -->
            <div class="introduce card mb-4">
              <div class="card-body d-flex flex-column align-items-center">
                <p class="mb-3">
                  <img src="../../assets/logo.jpg" alt="Logo" class="rounded-circle" width="100" height="100">
                </p>
                <div class="profile-info text-center">
                  <h3 class="card-title">码动未来</h3>
                  <p class="card-text">这是一个小白的学习笔记，用来记录一些编程教程，工具安装，编码技巧等</p>
                </div>
                <hr width="100%">
                <div class="profile-social">
                  <a href="https://github.com/8848TI/CodeFuture_Drive" target="_blank">
                    <i class="bi bi-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <!-- 介绍区域结束 -->
            <!-- 导航栏开始 -->
            <div class="navbar">
              <ul>
                <router-link to="/blog/tags">
                  <li>
                    <span class="icon">
                      <i class="bi bi-tag-fill"></i>
                    </span>
                    <span class="text">标签</span>
                    <span class="total">22</span>
                    <span class="icon">
                      <i class="bi bi-chevron-right"></i>
                    </span>
                  </li>
                </router-link>
                <router-link to="/blog/categories">
                  <li>
                    <span class="icon">
                      <i class="bi bi-box-fill"></i>
                    </span>
                    <span class="text">分类</span>
                    <span class="total">12</span>
                    <span class="icon">
                      <i class="bi bi-chevron-right"></i>
                    </span>
                  </li>
                </router-link>
                <router-link to="/blog/archives">
                  <li>
                    <span class="icon">
                      <i class="bi bi-folder-fill"></i>
                    </span>
                    <span class="text">归档</span>
                    <span class="total">25</span>
                    <span class="icon">
                      <i class="bi bi-chevron-right"></i>
                    </span>
                  </li>
                </router-link>
              </ul>
            </div>
            <!-- 导航栏结束 -->
          </div>
        </div>
        <!-- 右侧固定栏结束 -->
      </div>
    </main>
  </div>
  <!-- 页脚 -->
  <FooterInfo />
  <!-- 回到顶部 -->
  <GoTop />
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}

#blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .right {
    position: relative;

    .aside {
     position: sticky;
     top: 20px;

      // 介绍区域样式开始
      .introduce {
        background-color: var(--theme-second-bg);
        box-shadow: 1px 2px 2px var(--theme-card-highlight);
        transition: box-shadow 0.3s ease-in-out;

        &:hover {
          box-shadow: 1px 4px 8px var(--theme-card-hover-shadow);
        }

        .profile-info {
          h3 {
            color: var(--color-heading);
          }

          p {
            color: var(--color-text);
          }
        }

        .profile-social {
          display: flex;
          justify-content: center;
          gap: 1rem;
          
          a {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--icon-color);

            i {
              font-size: 1.5rem;
            }
          }
        }
      }
      // 介绍区域样式结束
      // 导航栏样式开始 
      .navbar {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        

        ul {
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          width: 100%;
          padding: 0;

          a {
            li {
              width: 100%;
              padding: 1rem;
              margin: .6rem 0;
              border-radius: 12px;
              background-color: var(--theme-second-bg);
              display: grid;
              grid-template-rows: 1fr;
              grid-template-columns: 1fr 9fr 1fr 1fr;
              align-items: center;
              justify-content: space-between;
              color: #5086a1;
              box-shadow: 1px 2px 2px var(--theme-card-highlight);
              transition: box-shadow 0.3s ease-in-out;
              
              &:hover {
                box-shadow: 1px 4px 8px var(--theme-card-hover-shadow); 
              }
            }
          }
        }
       
      }
      // 导航栏样式结束

     .card {
      border: none;
      border-radius: 16px;
     }
    }
  }
}
</style>