<template>
  <div class="absolute top-0 left-0 w-full h-full" style="background-color: rgba(0, 0, 0, 0.4)">
    <button @click="wateringAniemation()">测试</button>
    <div class="relative w-full h-full">
      <div class="container">
        <div class="container-content">
          <div ref="containerRef" class="container-content__wrapper">
            <div class="board">
              当前阶段
              <br />
              开花
            </div>
            <div class="land"></div>
            <div class="barrel"></div>
            <div ref="spoonRef" class="spoon"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import wateringAnim from '@/assets/image/GrowthAnimation/watering-anim.gif';

const spoonRef = ref();
const containerRef = ref();

const wateringAniemation = () => {
  console.log(spoonRef.value);

  gsap.to(spoonRef.value!, {
    x: -320,
    y: -300,
    ease: 'power4.out',
    duration: 1,
    onComplete: () => {
      const image = document.createElement('img') as HTMLImageElement;
      image.src = wateringAnim;
      image.style.position = 'absolute';
      image.style.left = '50%';
      image.style.top = '50%';
      image.style.width = '200px';
      image.style.height = '600px';
      containerRef.value.appendChild(image);
    },
  });
};
</script>

<style scoped lang="scss">
$border-width: math.div(1891px, 2);
$border-height: math.div(1514px, 2);
$width: math.div(1494px, 2);
$height: math.div(1122px, 2);

.container {
  position: absolute;
  width: $border-width;
  height: $border-height;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url(src/assets/image/GrowthAnimation/background-border.png) no-repeat center center;
  background-size: 100% 100%;

  &-content {
    position: absolute;
    left: 100px;
    bottom: 70px;
    width: $width;
    height: $height;
    background: url(src/assets/image/GrowthAnimation/background.png) no-repeat center center;
    background-size: 100% 100%;

    &__wrapper {
      position: relative;
      width: 100%;
      height: 100%;

      .board {
        $board-width: math.div(388px, 2);
        $board-height: math.div(330px, 2);

        position: absolute;
        left: -100px;
        top: -30px;
        width: $board-width;
        height: $board-height;
        background: url(src/assets/image/GrowthAnimation/board.png) no-repeat center center;
        background-size: 100% 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 42px;
        font-weight: bold;
        color: block;
        font-family: '华文行楷';
      }

      .land {
        $land-width: math.div(774px, 2);
        $land-height: math.div(389px, 2);

        position: absolute;
        left: 50%;
        bottom: 150px;
        transform: translateX(-50%);
        width: $land-width;
        height: $land-height;
        background: url(src/assets/image/GrowthAnimation/land.png) no-repeat center center;
        background-size: 100% 100%;
      }

      .barrel {
        $barrel-width: math.div(189px, 2);
        $barrel-height: math.div(316px, 2);

        position: absolute;
        right: 0;
        bottom: 0;
        width: $barrel-width;
        height: $barrel-height;
        background: url(src/assets/image/GrowthAnimation/barrel.png) no-repeat center center;
        background-size: 100% 100%;
      }

      .spoon {
        $spoon-width: math.div(2223px, 30);
        $spoon-height: math.div(1258px, 30);

        position: absolute;
        right: -12px;
        bottom: 85px;
        width: $spoon-width;
        height: $spoon-height;
        background: url(src/assets/image/GrowthAnimation/spoon.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
