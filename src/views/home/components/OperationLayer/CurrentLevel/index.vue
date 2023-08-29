<template>
  <div class="level" v-if="userStore.userInfo.userType === USER_TYPE.STUDENT">
    <p class="name">{{ flowerLevel.name }}</p>
    <div class="icon" v-if="flowerLevel">
      <img :src="flowerLevel.image" />
    </div>
    <div v-else class="icon">暂无等级</div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useFlowersStore from '@/store/modules/flowers.ts'
import { USER_TYPE } from '@/utils/dict'

const userStore = useUserStore()
const flowersStore = useFlowersStore()
const flowerLevel = flowersStore.calculateFlowerNewLevel(
  userStore.userInfo.totalScore,
)
</script>

<style scoped lang="scss">
$width: 312px * 0.6;
$height: 250px * 0.6;

.level {
  width: $width;
  height: $height;
  background: url(src/assets/image/home-growth-level-bg2.png);
  background-size: 100% 100%;

  .name {
    position: absolute;
    width: 100%;
    top: -20px;
    left: 0;
    text-align: center;
    color: white;
    font-size: 24px;
    font-family: 华文行楷;
  }

  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: $width * 0.6;
      height: $height * 0.6;
      object-fit: contain;
      -webkit-user-drag: none;
    }
  }
}
</style>
