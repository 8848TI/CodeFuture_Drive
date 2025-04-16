<script setup>

</script>

<template>
  <div id="pagination">
    <ul class="page-list">
      <li class="material-icons page-btn page-btn-prev isClick">
        <i class="bi bi-chevron-left"></i>
      </li>
      <li class="page-number">1</li>
      <li class="material-icons page-dot page-dot-prev"></li>
      <li class="page-number">2</li>
      <li class="page-number active">3</li>
      <li class="page-number">4</li>
      <li class="material-icons page-dot page-dot-next"></li>
      <li class="page-number">5</li>
      <li class="material-icons page-btn page-btn-next isClick">
        <i class="bi bi-chevron-right isClick"></i>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
#pagination {
  width: 100%;
  
  .page-list {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 30px 0;
    padding: 0;
    border-radius: 8px;
    // 使用背景颜色变量
    background-color: var(--theme-second-bg);
    // 使用阴影颜色变量
    box-shadow: 1px 2px 2px var(--theme-card-highlight);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 1px 4px 8px var(--theme-card-hover-shadow);
    }

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        margin: 10px;
        border-radius: 5px;
        transition: all .3s;

        // 左右按钮
        &.page-btn {
          color: var(--color-text);
          font-size: 22px;

          &.isClick {
            color: var(--color-text);
            cursor: pointer;
            &:hover {
                // 使用文字悬停/激活颜色变量
                color: var(--color-text);
                // 使用主色调变量
                background-color: var(--theme-main-bg);
            }
          }
        }

        // 页码
        &.page-number {
          color: var(--color-text);
          cursor: pointer;
          &:hover {
              // 使用文字悬停/激活颜色变量
              color: var(--theme-accent-color);
              font-weight: bold;
              // 使用主色调变量
              background-color: var(--theme-main-bg);
          }
          // 选中状态
          &.active {
              // 使用文字悬停/激活颜色变量
              color: var(--theme-accent-color);
              font-weight: bold;
              // 使用主色调变量
              background-color: var(--theme-main-bg);
              cursor: default;
          }   
        }
        // 省略号
        &.page-dot {
          // 使用文字默认颜色变量
          color: var(--color-text);
          font-size: 18px;
          cursor: pointer;
          &:hover {
            // 使用主色调变量
            color: var(--theme-accent-color);
          }
          &::after {
            content: '···';
          }
          // 左边
          &.page-dot-prev:hover {
              &::after {
                // 使用 Bootstrap 的向左箭头图标
                content: '\F276';
                font-family: 'bootstrap-icons';
              }
          }
          // 右边
          &.page-dot-next:hover {
              &::after {
                // 使用 Bootstrap 的向右箭头图标
                content: '\F277';
                font-family: 'bootstrap-icons';
              }
          }
      }

    }
  }
}
</style>