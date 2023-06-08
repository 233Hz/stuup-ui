<template>
  <div class="flower-icon">
    <div
      class="flower-icon__item"
      v-for="(item, index) in conversionFlower.calculateConversionFlower(score)"
      :key="index">
      <div>{{ item.value }}</div>
      <img :src="item.imageSrc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConversionFlower } from '@/utils/conversionFlower';
const conversionFlower = useConversionFlower();

type Props = {
  score: number;
};

defineProps<Props>();
</script>

<style scoped lang="scss">
.flower-icon {
  display: flex;
  justify-content: center;

  &__item {
    position: relative;
    margin: 10px;
    > div {
      position: absolute;
      bottom: 0;
      right: -10px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      background-color: #e6a23c;
      border-radius: 50%;
      z-index: 1;
      color: #909399;
      font-size: 12px;
    }
    > img {
      width: 40px;
      height: 40px;
      display: block;
      border-radius: 50%;
      -webkit-user-drag: none;
      z-index: 0;
    }
  }
}
</style>
