<script setup lang="ts">
interface Props {
  title?: string
  background1?: string[]
  background2?: string[]
  backgroundWidth?: number
  titleGHeight?: number
}

const { title, background1, background2, backgroundWidth, titleGHeight } =
  withDefaults(defineProps<Props>(), {
    background1: () => ['bg-gradient-to-r', 'from-[#409eff66]', 'to-[#050c19]'],
    background2: () => ['bg-gradient-to-r', 'from-[#409eff66]', 'to-[#050c19]'],
    backgroundWidth: 100,
    height: 42,
    titleGHeight: 42,
  })
</script>

<template>
  <div
    class="module_title"
    :style="{
      height: titleGHeight + 'px',
      lineHeight: titleGHeight + 'px',
    }"
  >
    <div
      :class="background1"
      class="absolute top-0 bottom-0 left-0 h-full opacity-30 z-[-1]"
      :style="{
        width: backgroundWidth + 'px',
      }"
    ></div>
    <div
      :class="background2"
      class="absolute bottom-0 left-0 h-[2px] w-full"
    ></div>
    <p :class="titleClass">
      <slot :title="title">{{ title }}</slot>
    </p>
  </div>
</template>

<style scoped lang="scss">
.module_title {
  font-size: 24px;
  font-weight: 600;
  padding-left: 20px;
  position: relative;
  color: white;
  z-index: 0;
  margin: 20px 0;
  border-radius: 4px;
  overflow: hidden;
}
</style>
