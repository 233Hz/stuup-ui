<template>
  <div
    class="w-80 mx-10 cursor-pointer fs-12"
    @click="props.path && router.push(props.path)"
  >
    <div class="w-full h-80 p-10">
      <svg-icon :name="props.icon || 'default'" width="60px" height="60px" />
    </div>
    <p class="text-center" style="color: #19c975">
      {{ props.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  title: string
  path?: string
  icon?: string
}>()
</script>

<style scoped lang="scss"></style>
