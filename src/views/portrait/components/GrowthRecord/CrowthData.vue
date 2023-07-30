<template>
  <div class="wrapper">
    <div ref="wrapperRef" class="wrapper-content">
      <div v-for="(item, index) in data" :key="index" class="item shadow-lg text-center text-white bg-red-500 flex">
        <div class="w-50 h-full bg-red=200 flex">
          <img :src="icon" class="w-40 h-40 m-auto" />
        </div>
        <div class="flex-1">
          <p>
            <span class="fs-14">{{ item.label }}</span>
          </p>
          <h3 class="line-h-32">
            <span class="fs-24 font-bold">{{ item.value }}</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import icon from '@/assets/svg/home-applay.svg';

const data = [
  {
    label: '成长值',
    value: 1000,
  },
  {
    label: '全校排名',
    value: 123,
  },
  {
    label: '成长扣除分',
    value: 100,
  },
  {
    label: '参加活动次数',
    value: 12,
  },
  {
    label: '获奖次数',
    value: 1,
  },
  {
    label: '获得证书',
    value: 1,
  },
];

let items: NodeListOf<HTMLDivElement>;
const r = 300;
let step = 0;
let pDeg: number;
const wrapperRef = ref<HTMLDataElement>();

onMounted(() => {
  items = document.querySelectorAll('.item');
  pDeg = 360 / items.length;
  layout();
  let isDragging = false;
  let startPosX = 0;
  wrapperRef.value?.addEventListener('mousedown', e => {
    isDragging = true;
    startPosX = e.clientX;
    // wrapperRef.value!.style.cursor = 'grabbing';
  });

  wrapperRef.value?.addEventListener('mouseup', e => {
    isDragging = false;
    // wrapperRef.value!.style.cursor = 'grab';
    const offsetX = e.clientX - startPosX;
    if (offsetX < 50 && offsetX > -50) return;
    offsetX > 0 ? step++ : step--;
    layout(step);
  });
});

const layout = (step: number = 0) => {
  items.forEach((item, index) => {
    const angle = (index + step) * pDeg;
    console.log(step);
    const x = r * Math.sin((angle * Math.PI) / 180);
    const z = r * Math.cos((angle * Math.PI) / 180);
    gsap.to(item, {
      x: x,
      z: z,
      duration: 0.5,
      rotateY: Math.abs(angle),
    });
  });
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 200px;
  perspective: 2000px;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.5);

  &-content {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;

    &:hover {
      cursor: grab;
    }

    $item-size: 200px;
    $n: 6;
    $r: 300px;
    $pDeg: math.div(360deg, $n);

    .item {
      position: absolute;
      width: $item-size;
      height: math.div($item-size, 4);
      top: 50%;
      left: 50%;
      margin-top: math.div(-$item-size, 4);
      margin-left: math.div(-$item-size, 2);
      border-radius: 8px;
      backface-visibility: hidden;
      cursor: grab;

      &:nth-child(1) {
        background-color: skyblue;
      }
      &:nth-child(2) {
        background-color: greenyellow;
      }
      &:nth-child(3) {
        background-color: yellowgreen;
      }
      &:nth-child(4) {
        background-color: orange;
      }
      &:nth-child(5) {
        background-color: orangered;
      }
      &:nth-child(5) {
        background-color: pink;
      }
      // @for $i from 1 through $n {
      //   &:nth-child(#{$i}) {
      //     $d: $i * $pDeg;
      //     $x: $r * math.sin($d);
      //     $z: $r * math.cos($d);
      //     transform: translate3d(#{$x}, 0, #{$z}) rotateY(180deg + $d);
      //   }
      // }
    }
  }
}
</style>
