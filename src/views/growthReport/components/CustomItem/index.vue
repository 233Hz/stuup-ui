<script setup lang="ts">
interface Props {
  backgroundColor?: string
  borderLeftColor?: string
  showLeftBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#2594ff1a',
  borderLeftColor: '#2594ff',
  showLeftBorder: true,
})
</script>

<template>
  <div
    class="container"
    :style="{
      backgroundColor: backgroundColor,
      borderLeft: showLeftBorder ? '4px solid' : 'none',
      borderColor: borderLeftColor,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  border-radius: 4px;
  padding: 8px 16px;
  margin: 10px 0;
}
</style>
