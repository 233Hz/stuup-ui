<template>
  <div class="flower-icon">
    <div
      class="flower-icon__item"
      v-for="(item, index) in conversionFlower.calculateConversionFlower(score)"
      :key="index">
      <div
        :style="{
          width: width / 2 + 'px',
          height: height / 2 + 'px',
          lineHeight: height / 2 + 'px',
          fontSize: (width / 2) * 0.6 + 'px',
        }">
        {{ item.value }}
      </div>
      <img :width="width" :height="height" :src="item.imageSrc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConversionFlower } from '@/utils/conversionFlower';
const conversionFlower = useConversionFlower();

interface Props {
  score: number;
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 40,
  height: 40,
});
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
      right: 0;
      transform: translateX(50%);
      text-align: center;
      background-color: #e6a23c;
      border-radius: 50%;
      color: #909399;
      z-index: 1;
    }
    > img {
      display: block;
      border-radius: 50%;
      -webkit-user-drag: none;
      z-index: 0;
    }
  }
}
</style>
