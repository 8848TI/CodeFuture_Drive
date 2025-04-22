<script setup>

// 普通导航项
const normalNavItems = [
  { text: '博客文章', to: '/user', active: true },
  { text: '文章分类', to: '/user/personalarticel' },
  { text: '修改信息', to: '/user/userinfo' }
]

</script>

<template>
  <div id="navbar">
    <ul>
      <li>
        <div class="avatar">
          <img src="../../assets/images/tb.jpg" alt="">
        </div>
      </li>
      <li v-for="item in normalNavItems" :key="item.text">
        <router-link :to="item.to" :class="{ active: item.active }">{{ item.text }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  background-color: var(--theme-second-bg);

  ul {
    position: relative;
    display: flex;
    width: 1000px;
    margin: 0 auto;
    padding: 0;

    li:first-child {
      width: 200px;
      height: 100%;

      .avatar {
        position: absolute;
        bottom: calc(50% - 5px);
        width: 150px;
        height: 150px;
        margin: 0 auto;
        overflow: hidden;
        border: 3px solid var(--theme-second-bg);
        border-radius: 5%;

        img {
          width: 100%;
          height: 100%;
        } 
      }
    }
    
    li {

      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 500;
      padding: 0 10px;

      // .avatar {
      //   width: 3rem;
      //   height: 3rem;


      //   img {
      //     width: 100%;
      //     height: 100%;
      //   } 
      // }

      a {
        text-decoration: none;
        color: var(--color-heading);
      }

    }
  }

  @media screen and (max-width: 1000px) {
    ul {
      width: 400px;

      li {
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    ul {

      li {
        font-size: 12px;
      }
    }
  }
}
</style>