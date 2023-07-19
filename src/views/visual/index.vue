<template>
  <div class="visual">
    <div class="visual-wrapper"></div>
  </div>
</template>

<script setup lang="ts">
const resetSize = () => {
  const { innerWidth, innerHeight } = window;
  const content = document.querySelector('.visual-wrapper') as HTMLDivElement;
  const contentRect = content.getBoundingClientRect();
  console.log(contentRect.height, contentRect.width);

  if (innerWidth > innerHeight && innerWidth / innerHeight > 16 / 9) {
    content.style.transform = `scale(${innerHeight / 1920})`;
  } else {
    content.style.transform = `scale(${innerWidth / 1080})`;
  }
};
window.onresize = () => {
  resetSize();
};
</script>

<style lang="scss" scoped>
.visual {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &-wrapper {
    min-width: 1920px;
    min-height: 1080px;
    width: 1920px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    user-select: none;
    border: red solid 1px;
  }
}
</style>
