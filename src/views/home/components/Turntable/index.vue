<template>
  <div ref="turntableRef" class="turntable" v-show="show">
    <div class="turntable-outer">
      <div ref="turntableInnerRef" class="turntable-outer__wrapper">
        <div class="sector">
          <img id="bmhSeed" src="@/assets/flower_icons/xcj_seed.png" />
        </div>
        <div class="sector">
          <img id="bmhSprout" src="@/assets/flower_icons/xcj_sprout.png" />
        </div>
        <div class="sector">
          <img id="bmhBloom" src="@/assets/flower_icons/xcj_bloom.png" />
        </div>
        <div class="sector">
          <img id="bmhFruit" src="@/assets/flower_icons/xcj_fruit.png" />
        </div>
        <div class="sector">
          <img id="xcjSeed" src="@/assets/flower_icons/bmh_seed.png" />
        </div>
        <div class="sector">
          <img id="xcjSprout" src="@/assets/flower_icons/bmh_sprout.png" />
        </div>
        <div class="sector">
          <img id="xcjBloom" src="@/assets/flower_icons/bmh_bloom.jpg" />
        </div>
        <div class="sector">
          <img id="xcjFruit" src="@/assets/flower_icons/bmh_fruit.png" />
        </div>
        <div class="sector">
          <img id="xhhSeed" src="@/assets/flower_icons/xhh_seed.png" />
        </div>
        <div class="sector">
          <img id="xhhSprout" src="@/assets/flower_icons/xhh_sprout.png" />
        </div>
        <div class="sector">
          <img id="xhhBloom" src="@/assets/flower_icons/xhh_bloom.png" />
        </div>
        <div class="sector">
          <img id="xhhFruit" src="@/assets/flower_icons/xhh_fruit.png" />
        </div>
      </div>
      <div class="arrow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const turntableRef = ref<HTMLDivElement>()
const turntableInnerRef = ref<HTMLDivElement>()

const show = ref<boolean>(false)

const playAnimate = (options: { endX: number; endY: number }) => {
  show.value = true
  if (show.value) {
    const imageEl = document.getElementById('bmhBloom') as HTMLImageElement
    const parentElement = imageEl.parentElement as HTMLDivElement
    const angle = getElTransformAngle(parentElement)

    gsap.to(turntableInnerRef.value!, {
      rotation: `-=${720 + angle}`,
      ease: 'power4.out',
      duration: 4,
      onComplete: () => {
        console.log('动画执行完成')
        // 创建图片元素
        const image = document.createElement('img')
        image.src = imageEl.getAttribute('src') as string
        image.style.position = 'absolute'
        image.style.left = '50%'
        image.style.top = '50%'
        image.style.width = '50px'
        image.style.height = '50px'
        image.style.borderRadius = '50%'
        image.style.transform = 'translate(-50%, -50%)'
        // 插入图片元素到元素中
        turntableRef.value?.appendChild(image)
        gsap.to(image, {
          width: 400,
          height: 400,
          duration: 1,
          onComplete: () => {
            gsap.to(image, {
              x: -800,
              y: -400,
              scale: 0,
              duration: 2,
              onComplete: () => {
                turntableRef.value?.removeChild(image)
                gsap.set(turntableInnerRef.value!, { rotation: 0 })
                show.value = false
              },
            })
          },
        })
      },
    })
  }
}

const getElTransformAngle = (el: Element): number => {
  const computedStyle = getComputedStyle(el)
  const transform = computedStyle.transform // 处理不同浏览器的前缀
  console.log(computedStyle)
  console.log(transform)
  let angle = 0

  if (transform && transform !== 'none') {
    const matrix = transform.match(/matrix.*\((.+)\)/)![1].split(',') // 提取矩阵值
    if (matrix.length === 6) {
      angle = Math.round(
        Math.atan2(parseFloat(matrix[1]), parseFloat(matrix[0])) *
          (180 / Math.PI),
      ) // 计算旋转角度
    }
  }

  return angle
}

defineExpose({ playAnimate })
</script>

<style scoped lang="scss">
$R: 250px;
$r: 50px;
$n: 12;
$pDeg: math.div(360, $n);

.turntable {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &-outer {
    $padding: 40px;

    position: absolute;
    left: 50%;
    top: 50%;
    width: ($R + $r + $padding) * 2;
    height: ($R + $r + $padding) * 2;
    transform: translate(-50%, -50%);
    border: math.div($padding, 2) solid #ffbd72;
    border-radius: 50%;
    overflow: hidden;

    &__wrapper {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #4158d0;
      background-image: sectorar-gradient(
        43deg,
        #4158d0 0%,
        #c850c0 46%,
        #ffcc70 100%
      );

      .sector {
        $w: ($R + $r + $padding) * 2 *
          math.tan(math.div($pDeg, 2) * math.div(math.$pi, 180));

        position: absolute;
        left: 50%;
        margin-left: math.div(-$w, 2);
        width: $w;
        height: 50%;
        clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
        -webkit-clip-path: -webkit-polygon(50% 100%, 0% 0%, 100% 0%);
        transform-origin: bottom center;

        @for $i from 1 through $n {
          &:nth-child(#{$i}) {
            transform: rotate(#{$i * $pDeg - $pDeg}deg);
          }
        }

        &:nth-child(odd) {
          background-color: #fbab7e;
        }

        &:nth-child(even) {
          background-color: #f7ce68;
        }

        > img {
          $imgSize: $w * 0.5;

          position: absolute;
          left: 50%;
          width: $imgSize;
          height: $imgSize;
          border-radius: 50%;
          transform: translate(-50%, 10%);
          -webkit-user-drag: none;
        }
      }
    }
    $arrowSize: 20px;
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: $arrowSize;
      height: $arrowSize;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: #8bd3dd;
    }
    .arrow {
      position: absolute;
      left: 50%;
      top: 50%;
      width: $arrowSize;
      height: math.div($R + $r + $padding, 2);
      transform: translate(-50%, -100%);
      border-left: math.div($arrowSize, 2) solid transparent;
      border-right: math.div($arrowSize, 2) solid transparent;
      border-bottom: math.div($R + $r + $padding, 2) solid #d9afd9;
      overflow: hidden;
    }
  }
}
</style>
