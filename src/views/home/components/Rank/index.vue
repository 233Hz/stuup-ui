<template>
  <div
    class="absolute top-0 left-0 w-full h-full select-none text-center rank"
    v-show="show"
  >
    <div class="rank-wrapper">
      <WholeSchoolRanking />
      <WholeClassRanking />
      <ProgressRanking />
    </div>
    <div class="rank-close" @click="show = false">
      <div class="rank-close__icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WholeSchoolRanking from './WholeSchoolRanking/index.vue'
import WholeClassRanking from './WholeClassRanking/index.vue'
import ProgressRanking from './ProgressRanking/index.vue'
import bus from '@/utils/bus'

bus.on('show-rank', () => (show.value = true))

const show = ref<boolean>(false)
</script>

<style scoped lang="scss">
.rank {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 遮罩层背景颜色和透明度 */
    z-index: -1;
  }

  &-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;

    &__icon {
      position: relative;
      width: 100%;
      height: 100%;
      transition: 0.3s;
      transform-origin: center;
      border-radius: 50%;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 5px;
        border-radius: 8px;
        background-color: white;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 5px;
        border-radius: 8px;
        background-color: white;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &:hover {
        cursor: pointer;
        background-color: #fa8bff;
        background-image: linear-gradient(
          45deg,
          #fa8bff 0%,
          #2bd2ff 52%,
          #2bff88 90%
        );
        transform: rotate(90deg);
      }
    }
  }
}
</style>
