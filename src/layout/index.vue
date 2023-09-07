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
          <router-view>
            <template #default="{ Component, route }">
              <transition name="fade">
                <keep-alive :include="permissionStore.getCachedView">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </transition>
            </template>
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
import usePermissionStore from '@/store/modules/permission'

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
      width: calc(100% - var(--aside-width));
      height: 100%;
      display: flex;
      flex-direction: column;

      .breadcrumb {
        height: 30px;
        padding: 0 10px;
      }

      .main {
        position: relative;
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
