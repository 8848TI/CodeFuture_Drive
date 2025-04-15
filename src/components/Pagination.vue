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
    background-color: #fff;
    box-shadow: 0 16px 32px rgba(90, 100, 130, .1);

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
            color: #7b2d2d;
            font-size: 22px;

            &.isClick {
                color: #f0f;
                cursor: pointer;
                &:hover {
                    color: #fff;
                    background-color: #9288c0;
                }
            }
        }

        // 页码
        &.page-number {
          color: #f0f;
          cursor: pointer;
          &:hover {
              color: #fff;
              font-weight: bold;
              background-color: red;
          }
          // 选中状态
          &.active {
              color: #fff;
              font-weight: bold;
              background-color: #9288c0;
              cursor: default;
          }   
        }
        // 省略号
        &.page-dot {
          color: #e0e0e0;
          font-size: 18px;
          cursor: pointer;
          &:hover {
            color: #929292;
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