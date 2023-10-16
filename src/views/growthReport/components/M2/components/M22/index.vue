<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'

const { data } = defineProps<{
  data?: string[]
}>()
</script>

<template>
  <module-card header-left-text="职业资格证书" color="#fd3d7f33" class="h-full">
    <div class="p-[10px]">
      <custom-item
        v-if="data && data.length > 0"
        v-for="item in data"
        :key="item"
        background-color="#fd3d7f1a"
        border-left-color="#fd3d7f"
      >
        <p>{{ item }}</p>
      </custom-item>
      <custom-item
        v-else
        background-color="#fd3d7f1a"
        :show-left-border="false"
      >
        <p class="text-center">未获取过职业资格证书</p>
      </custom-item>
    </div>
  </module-card>
</template>
