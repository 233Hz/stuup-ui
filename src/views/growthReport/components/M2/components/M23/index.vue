<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'

defineProps<{
  data?: string[]
}>()
</script>

<template>
  <module-card header-left-text="职业素养" color="#17c492" class="h-full">
    <div class="p-[10px]">
      <template v-if="data && data.length > 0">
        <custom-item
          v-for="item in data"
          :key="item"
          background-color="#f4f4f5"
          border-left-color="#17c492"
        >
          <p>{{ item }}</p>
        </custom-item>
      </template>
      <template v-else>
        <custom-item background-color="#17c492" :show-left-border="false">
          <p class="text-center text-white">未参加过职业素养比赛</p>
        </custom-item>
      </template>
    </div>
  </module-card>
</template>
