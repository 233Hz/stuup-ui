<template>
  <div class="details">
    <div class="details-wrapper">
      <el-page-header :icon="ArrowLeft"></el-page-header>
      <div class="details-wrapper__header">
        <p class="total-score">100</p>
        <p class="total-text">当前总积分</p>
      </div>
      <div class="details-wrapper__content">
        <ul class="content-wrapper" v-infinite-scroll="load">
          <li class="content-wrapper__item" v-for="item in count" :key="item">
            <div class="item-left">
              <div class="score-source">每日签到</div>
              <div class="score-time">{{ new Date() }}</div>
            </div>
            <div class="item-right">
              <div class="score-number">+2</div>
            </div>
          </li>
          <li class="flex justify-center">
            <el-icon :class="loading ? 'is-loading' : ''"><Loading /></el-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, Loading } from '@element-plus/icons-vue';
const loading = ref(false);
const count = ref(10);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    console.log('aaa');
    count.value += 2;
    loading.value = false;
  }, 2000);
};
</script>

<style scoped lang="scss">
.details {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'SimHei', 'Arial', 'SimSun';

  &-wrapper {
    position: relative;
    margin: auto;
    width: 50%;
    height: 100%;
    padding: 20px;

    &__header {
      text-align: center;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: #ccc solid 1px;

      .total-score {
        font-size: 48px;
        font-weight: 600;
        color: #0a0a24;
      }

      .total-text {
        font-size: 16px;
        color: #818181;
      }
    }

    &__content {
      width: 100%;

      .content-wrapper {
        position: relative;
        width: 100%;

        &__item {
          width: 100%;
          height: 100px;
          margin: 10px 0;
          padding: 10px;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          cursor: pointer;
          min-width: 300px;

          &:hover {
            color: #409eff;
            background-color: rgba(87, 87, 87, 0.1);
          }

          .item-left {
            flex: 1;
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .score-source,
            .score-time {
              width: 100%;
            }
            .score-source {
              font-size: 18px;
              font-weight: 600;
            }
            .score-time {
              margin-top: 10px;
              font-size: 12px;
              color: #818181;
            }
          }

          .item-right {
            width: 100px;
            height: 100%;
            line-height: 100px;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: #0a0a24;
          }
        }
      }
    }
  }
}
</style>
