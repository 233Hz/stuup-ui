<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div v-for="(i, index) in 6" :key="index" class="item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const cards = document.querySelectorAll('.item');
  let isDragging = false;
  let startPosX = 0;
  cards.forEach((card, index) => {
    card.style.transform = `rotateY(${index * 60}deg) translateZ(200px)`;

    card.addEventListener('mousedown', e => {
      isDragging = true;
      startPosX = e.clientX;
      card.style.transition = 'none';
    });

    card.addEventListener('mousemove', e => {
      if (isDragging) {
        const deltaX = e.clientX - startPosX;
        card.style.transform = `rotateY(${index * 30 + deltaX / 5}deg) translateZ(200px)`;
      }
    });

    card.addEventListener('mouseup', () => {
      isDragging = false;
      card.style.transition = 'transform 0.3s ease';
      const rotation = parseInt(card.style.transform.replace(/[^0-9.-]/g, ''));
      const roundedRotation = Math.round(rotation / 30) * 30;
      card.style.transform = `rotateY(${roundedRotation}deg) translateZ(200px)`;
    });
  });
});
</script>

<style scoped lang="scss">
.wrapper {
  height: 300px;
  perspective: 2000px;

  &-content {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;

    $item-size: 200px;
    $n: 6;
    $r: 300px;
    $pDeg: 360deg / $n;

    .item {
      position: absolute;
      width: $item-size;
      height: $item-size;
      top: 50%;
      left: 50%;
      margin-top: math.div(-$item-size, 2);
      margin-left: math.div(-$item-size, 2);
      border: red solid 1px;
      background-color: aqua;
      backface-visibility: hidden;
      opacity: 0.5;
      transition: opacity 0.2s;
      cursor: grab;
      &:hover {
        opacity: 1;
      }
      @for $i from 1 through $n {
        &:nth-child(#{$i}) {
          $d: $i * $pDeg;
          $x: $r * math.sin($d);
          $z: $r * math.cos($d);
          transform: translate3d(#{$x}, 0, #{$z}) rotateY(180deg + $d);
        }
      }
    }
  }
}
</style>
