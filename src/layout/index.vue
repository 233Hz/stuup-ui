<template>
  <div class="layout">
    <div class="top">
      <Header />
    </div>
    <div class="bottom">
      <div class="left">
        <Aside />
      </div>
      <div class="right">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/header/index.vue'
import Aside from './components/aside/index.vue'
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;

  .top {
    height: var(--header-height);
    box-sizing: border-box;
  }

  .bottom {
    height: calc(100% - var(--header-height));
    display: flex;

    .left {
      max-width: var(--aside-width);
      height: 100%;
    }

    .right {
      flex: 1;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
