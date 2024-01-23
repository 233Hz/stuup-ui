<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { ArtSocieties } from '@/api/growthReport/type'

defineProps<{
  data?: ArtSocieties
}>()
</script>

<template>
  <module-card header-left-text="艺术社团" color="#17c492">
    <div class="p-[10px]">
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          参加学校及以上组织的艺术社团
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countArtSocieties || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>
