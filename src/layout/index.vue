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
        <div class="breadcrumb">
          <Breadcrumb />
        </div>
        <div class="main">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="permissionStore.getCachedView">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import Header from './components/header/index.vue'
import Aside from './components/aside/index.vue'
import Breadcrumb from './components/breadcrumb/index.vue'
import usePermissionStore from '@/store/modules/premission'

const permissionStore = usePermissionStore()
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
      display: flex;
      flex-direction: column;

      .breadcrumb {
        height: 30px;
        padding: 0 10px;
      }

      .main {
        flex: 1;
        overflow: auto;
      }
    }
  }
}
</style>
