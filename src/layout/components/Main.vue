<template>
  <div class="bunga-main">
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@include b(main) {
  flex: 1;
  position: relative;
  width: 100%;
  height: calc(100% - var(--header-height));
  overflow: auto;
  background-color: #f4f5f7;
}
</style>
