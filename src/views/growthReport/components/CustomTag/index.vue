<script setup lang="ts">
interface Props {
  text?: string
  borderColor?: string
  radius?: number
}
const { text, borderColor, radius } = withDefaults(defineProps<Props>(), {
  text: '标签',
  borderColor: '#fff',
  radius: 0,
})
</script>

<template>
  <span
    class="px-12 py-6 inline-flex border-[1px] border-solid"
    :style="{
      borderColor: borderColor,
      borderRadius: radius + 'px',
    }"
  >
    <span>
      <slot>{{ text }}</slot>
    </span>
  </span>
</template>
