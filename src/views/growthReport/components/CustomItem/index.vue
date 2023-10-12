<script setup lang="ts">
interface Props {
  backgroundColor: string
  borderLeftColor: string
}

const { backgroundColor } = withDefaults(defineProps<Props>(), {
  backgroundColor: '#2594ff1a',
  borderLeftColor: '#2594ff',
})
</script>

<template>
  <div
    class="container"
    :style="{
      backgroundColor: backgroundColor,
      borderColor: borderLeftColor,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  border-radius: 4px;
  border-left: 4px solid;
  padding: 8px 16px;
  color: #fff;
  margin: 10px 0;
}
</style>
