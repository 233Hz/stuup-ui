<template>
  <div class="h-full flex items-center">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in route.matched.filter(
          (item) => !String(item.name).includes('Parent'),
        )"
        :key="index"
        :to="item.path"
      >
        <div class="flex">
          <!-- 图标 -->
          <el-icon class="mr-2" v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <!-- 面包屑展示匹配路由的标题 -->
          <div>{{ item.meta.title }}</div>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="scss"></style>
