<script setup>
import { RouterView,useRoute, useRouter } from 'vue-router'
import { watch, ref, onMounted } from 'vue'

import BlogEntryPreview from '@/components/BlogEntryPreview.vue'
import BlogPagination from '@/components/BlogPagination.vue'
import GoTop from '@/components/GoTop.vue'
import FooterInfo from '../../components/FooterInfo.vue'

import { useBlogRoute } from '@/stores/index'

import { articleGetPublicAllArticle, articleGetPublicAllArticleTags } from '@/api/articlePublicService'

// 获取所有文章
const articles = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const getArticles = async () => {
  const { data } = await articleGetPublicAllArticle(currentPage.value, pageSize.value)
  total.value = data.total
  // console.log(data.data[1].cover_url)
  if (data.status === 0) articles.value = data.data
  for (let i = 0; i < articles.value.length; i++) {
    articles.value[i].created_at = articles.value[i].created_at.split('T')[0]
  }
}
// 调用函数获取文章
onMounted(() => {
  getArticles()
})

// 处理分页变化
const handlePageChange = (page) => {
  articles.value = [] // 清空文章列表，防止重复加载
  currentPage.value = page
  getArticles()
}

// 获取所有文章标签
const typesCount = ref(0)
const categoriesCount = ref(0)
const archivesCount = ref(0)
const getTypes = async () => {
  const { data } = await articleGetPublicAllArticleTags(1,2)
  typesCount.value = data.data.length
}
getTypes()

// 同过监听导航来控制是否显示三级路由
const blogRoute = useBlogRoute()
const route = useRoute()
const router = useRouter()

// 监听路由变化
watch(() => route.fullPath, (newPath) => {
  newPath === '/blog' ? blogRoute.setFlag(false) : blogRoute.setFlag(true)
})
function setFlag(it) {
  it === '/blog' ? blogRoute.setFlag(false) : blogRoute.setFlag(true)
}

setFlag(route.fullPath)

// 跳转到文章详情页
const goToArticleDetail = (id) => {
  console.log(id)
  router.push({ name: 'ArticleDetail', params: { id } })
}

</script>

<template>
  <div id="blog">
    <main class="container">
      <div class="row">
        <!-- 三级路由出口 -->
        <RouterView class="col-lg-9" v-if="blogRoute.flag"/>
        <!-- 瀑布流布局 -->
        <div class="col-lg-9 masonry-layout" v-else>
          <BlogEntryPreview v-for="item in articles" :key="item.id"
            :title="item.title"
            author="张三"
            :date="item.created_at"
            :excerpt="item.description"
            :imageUrl="item.cover_url"
            @click="goToArticleDetail(item.id)"
          />
          <!-- 分页功能开始 -->
          <BlogPagination
            class="col-lg-9"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :total="total"
            @page-change="handlePageChange"
          />
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
                    <span class="total">{{ typesCount }}</span>
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
                    <span class="total">{{ categoriesCount }}</span>
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
                    <span class="total">{{ archivesCount }}</span>
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
      <GoTop/>
    </main>
  </div>
  <!-- 页脚 -->
  <!-- <FooterInfo /> -->
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}

#blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .container {
    position: relative;
    .row {
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
  }
}
</style>