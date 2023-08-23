<template>
  <div class="level" v-if="userStore.userInfo.userType === USER_TYPE.STUDENT">
    <div
      class="item"
      v-for="item in conversionFlower.calculateConversionFlower(
        userStore.userInfo.totalScore,
      )"
      :key="item.key"
    >
      <img :src="item.imageSrc" />
      <div class="number">
        <div class="number-wrapper">
          <div class="value">x{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { useConversionFlower } from '@/utils/conversionFlower'
import { USER_TYPE } from '@/utils/dict'

const userStore = useUserStore()
const conversionFlower = useConversionFlower()
</script>

<style scoped lang="scss">
.level {
  width: 312px;
  height: 250px;
  background: url(src/assets/image/home-growth-level-bg2.png);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &::after {
    content: '当前等级';
    width: 100%;
    font-size: 24px;
    font-family: 华文行楷;
    text-align: center;
    color: #fff;
    position: absolute;
    left: 0;
    top: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item {
    position: relative;
    width: 100px;
    height: 100px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      -webkit-user-drag: none;
    }

    .number {
      $zoom: 7;
      $width: math.div(452px, $zoom);
      $height: math.div(309px, $zoom);

      position: absolute;
      bottom: -$height;
      left: 50%;
      margin-left: math.div(-$width, 2);
      background: url(src/assets/image/home-growth-level-bg.png) no-repeat;
      background-size: 100% 100%;
      width: $width;
      height: $height;
      overflow: hidden;

      &-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        .value {
          position: absolute;
          left: 15%;
          top: 7%;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #fd846f;
          font-size: 18px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
