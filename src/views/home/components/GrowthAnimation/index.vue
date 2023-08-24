<template>
  <div
    v-show="show"
    class="absolute top-0 left-0 w-full h-full"
    style="background-color: rgba(0, 0, 0, 0.4)"
  >
    <div class="relative w-full h-full">
      <div ref="containerRef" class="container">
        <div ref="wrapperRef" class="container-wrapper">
          <div class="board">
            <div class="board-text">
              <p>成长阶段</p>
              <p class="fs-36">{{ currentLevel?.name }}</p>
            </div>
          </div>
          <div ref="landRef" class="land"></div>
          <div class="barrel"></div>
          <div ref="spoonRef" class="spoon"></div>
          <div class="progress">
            <div class="progress-bar">
              <div ref="progressBarRef" class="progress-bar__content"></div>
              <div ref="progressTextRef" class="progress-bar__text">
                {{ progressRatio * 100 }}%
              </div>
            </div>
            <div class="progress-tip">距离下一级还有{{ upgradeScore }}分</div>
          </div>
        </div>
        <div
          class="absolute t-0 r-0 w-80 h-80 cursor-pointer transition ease-in-out hover:rotate-180 duration-300"
          @click="show = false"
        >
          <svg-icon name="close" width="80px" height="80px" />
        </div>
      </div>
      <!-- <p
        class="absolute b-20 text-center text-slate-300 fs-18 cursor-pointer left-1/2 -translate-x-1/2 hover:text-white"
        @click="show = false"
      >
        点击关闭动画
      </p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import gsap from 'gsap'
import plantSrc from '@/assets/image/FlowerLevel/xhh4.png'
import wateringAnimSrc from '@/assets/image/GrowthAnimation/flowing-water-anim.png'
import upgradeAnimSrc from '@/assets/image/GrowthAnimation/upgrade-anim.png'
import { useConversionFlower, Flowers } from '@/utils/conversionFlower'
import bus from '@/utils/bus'

bus.on('collect-drop', (_score: number) => (score.value = _score))

const conversionFlower = useConversionFlower()

const wateringAnimFrame = 15
const upgradeAnimFrame = 11
const wrapperRef = ref()
const spoonRef = ref()
const landRef = ref()
const progressBarRef = ref()
let animationend = false

const show = ref<boolean>(false)
const score = ref<number>(0)
const currentLevel = ref<Flowers>()
const progressRatio = ref<number>(0)
const upgradeScore = ref<number>(0)

watch(score, (newVal) => {
  show.value = true
  nextTick(() => {
    wateringAnimation()
  })
})

// 浇水动画
const wateringAnimation = () => {
  if (!animationend) {
    // animationend = true
    const wateringX = landRef.value.offsetLeft + landRef.value.clientWidth / 2
    const wateringY = landRef.value.offsetTop - spoonRef.value.clientHeight
    console.log(landRef.value.offsetLeft, landRef.value.offsetTop)

    // 记录木勺的left和top
    const spoonX = spoonRef.value.offsetLeft
    const spoonY = spoonRef.value.offsetTop
    console.log(spoonX, spoonY)

    gsap.to(spoonRef.value!, {
      left: wateringX,
      top: wateringY,
      duration: 1,
      onComplete: () => {
        // 获取当前木勺中心点的坐标
        const spoonCenterX = wateringX + spoonRef.value.clientWidth / 2
        const spoonCenterY = wateringY + spoonRef.value.clientHeight / 2
        // 创建外层div
        const imageContainer = document.createElement('div') as HTMLDivElement
        const width = 192
        const height = 120
        imageContainer.style.width = width + 'px'
        imageContainer.style.height = height + 'px'
        imageContainer.style.position = 'absolute'
        imageContainer.style.left = spoonCenterX - width / 2 + 'px'
        imageContainer.style.top =
          spoonCenterY - spoonRef.value.clientHeight / 2 + 'px'
        imageContainer.style.overflow = 'hidden'
        imageContainer.style.zIndex = '999'
        // 创建内层img
        const image = document.createElement('img') as HTMLImageElement
        image.src = wateringAnimSrc
        image.style.width = width * wateringAnimFrame + 'px'
        image.style.height = '100%'
        image.style.objectFit = 'cover'
        imageContainer.appendChild(image)
        wrapperRef.value.appendChild(imageContainer)
        // 添加动画结束事件监听器
        image.addEventListener('animationend', () => {
          // 动画结束后销毁动画元素
          imageContainer.removeChild(image)
          wrapperRef.value.removeChild(imageContainer)
          // 木勺回到原位
          gsap.to(spoonRef.value!, {
            left: spoonX,
            top: spoonY,
            duration: 1,
            onComplete: () => {
              const { current, next } = conversionFlower.calculateMaxLevel(
                score.value,
              )
              // 计算进度
              const totalProgress = next.value - current.value
              const currentProgress = score.value - current.value
              const needScore =
                totalProgress - currentProgress < 0
                  ? 0
                  : totalProgress - currentProgress
              const ratio =
                totalProgress === 0 ? 1 : currentProgress / totalProgress
              upgradeScore.value = needScore
              progressRatio.value = Number(ratio.toFixed(2))
              increaseProgress(Number(ratio))
              if (
                current.key === currentLevel.value?.key &&
                current.value === currentLevel.value?.value &&
                current.imageSrc === currentLevel.value?.imageSrc
              )
                return
              currentLevel.value = current
              // 等级有变化播放升级动画
              upgradeAnimation()
            },
          })
        })
        // 添加动画效果
        image.style.animation = `translateXAnimation 1s steps(${wateringAnimFrame})`
      },
    })
  }
}

// 升级动画
const upgradeAnimation = () => {
  // 获取土地中心坐标
  const landCenterX = landRef.value.offsetLeft + landRef.value.clientWidth / 2
  const landCenterY = landRef.value.offsetTop + landRef.value.clientHeight / 2

  // 创建外层div
  const imageContainer = document.createElement('div') as HTMLDivElement
  const width = 120
  const height = 150
  imageContainer.style.width = width + 'px'
  imageContainer.style.height = height + 'px'
  imageContainer.style.position = 'absolute'
  imageContainer.style.left = landCenterX - width / 2 + 'px'
  imageContainer.style.top = landCenterY - height / 2 - 20 + 'px'
  imageContainer.style.overflow = 'hidden'
  imageContainer.style.zIndex = '999'

  // 创建内层img
  const imageEl = document.createElement('img') as HTMLImageElement
  imageEl.src = upgradeAnimSrc
  imageEl.style.width = width * upgradeAnimFrame + 'px'
  imageEl.style.height = '100%'
  imageEl.style.objectFit = 'cover'
  imageContainer.appendChild(imageEl)
  wrapperRef.value.appendChild(imageContainer)
  // 添加动画结束事件监听器
  imageEl.addEventListener('animationend', () => {
    // 动画结束后销毁动画元素
    imageContainer.removeChild(imageEl)
    wrapperRef.value.removeChild(imageContainer)
    const plantImage = document.createElement('img') as HTMLImageElement
    const image = new Image()
    image.src = plantSrc
    image.onload = () => {
      plantImage.src = currentLevel.value!.imageSrc
      plantImage.style.width = image.width / 5 + 'px'
      plantImage.style.height = image.height / 5 + 'px'
      plantImage.style.position = 'absolute'
      plantImage.style.left = landCenterX - image.width / 10 + 'px'
      plantImage.style.top = landCenterY - image.height / 10 + 'px'
      const imgElements = wrapperRef.value.querySelectorAll('img')
      imgElements.forEach(
        (imgElement: HTMLImageElement) =>
          imgElement.parentNode?.removeChild(imgElement),
      )
      wrapperRef.value.appendChild(plantImage)
      animationend = false
    }
  })
  // 添加动画效果
  imageEl.style.animation = `translateXAnimation 1s steps(${upgradeAnimFrame})`
}

const increaseProgress = (ratio: number) => {
  gsap.to(progressBarRef.value, {
    width: ratio * 100 + '%',
    duration: 1,
  })
}
</script>

<style>
@keyframes translateXAnimation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

<style scoped lang="scss">
$width: math.div(1494px, 2);
$height: math.div(1122px, 2);

.container {
  $background-width: math.div(1890px, 2);
  $background-height: math.div(1513px, 2);

  position: absolute;
  width: $background-width;
  height: $background-height;
  left: 50%;
  top: 50%;
  margin-left: math.div(-$background-width, 2);
  margin-top: math.div(-$background-height, 2);
  background: url(src/assets/image/GrowthAnimation/background.png) no-repeat
    center center;
  background-size: 100% 100%;

  &-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0;

    .board {
      $board-width: math.div(388px, 2);
      $board-height: math.div(330px, 2);

      position: absolute;
      left: 0;
      top: 80px;
      width: $board-width;
      height: $board-height;
      background: url(src/assets/image/GrowthAnimation/board.png) no-repeat
        center center;
      background-size: 100% 100%;

      &-text {
        position: absolute;
        bottom: 20px;
        left: 10px;
        transform: rotate(-5deg);
        text-align: center;
        font-size: 42px;
        font-weight: bold;
        color: block;
        font-family: '华文行楷';
      }
    }

    .land {
      $land-width: 380px;
      $land-height: 123px;

      position: absolute;
      left: 50%;
      bottom: 194px;
      margin-left: math.div(-$land-width, 2);
      width: $land-width;
      height: $land-height;
    }

    .barrel {
      $barrel-width: math.div(189px, 2);
      $barrel-height: math.div(316px, 2);

      position: absolute;
      right: 80px;
      bottom: 80px;
      width: $barrel-width;
      height: $barrel-height;
      background: url(src/assets/image/GrowthAnimation/barrel.png) no-repeat
        center center;
      background-size: 100% 100%;
    }

    .spoon {
      $spoon-width: math.div(2223px, 30);
      $spoon-height: math.div(1258px, 30);

      position: absolute;
      right: 68px;
      bottom: 165px;
      width: $spoon-width;
      height: $spoon-height;
      background: url(src/assets/image/GrowthAnimation/spoon.png) no-repeat
        center center;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .progress {
      position: absolute;
      left: 50%;
      bottom: 120px;
      margin-left: -200px;
      width: 400px;
      height: 50px;

      &-bar {
        $bar-height: 30px;
        $bar-radius: 25px;

        position: relative;
        width: 100%;
        height: $bar-height;
        border-radius: $bar-radius;
        background-color: rgba(255, 255, 255, 0.4);
        overflow: hidden;

        &__content {
          width: 0%;
          height: 100%;
          border-radius: $bar-radius;
          background-color: #127848;
        }

        &__text {
          position: absolute;
          right: 20px;
          top: 0;
          height: 100%;
          line-height: $bar-height;
          font-size: 24px;
          text-align: center;
          font-family: '华文行楷';
          font-weight: bold;
          color: white;
        }
      }

      &-tip {
        width: 100%;
        height: 20px;
        text-align: center;
        font-size: 14px;
        color: white;
        font-family: '楷体';
      }
    }
  }
}
</style>
