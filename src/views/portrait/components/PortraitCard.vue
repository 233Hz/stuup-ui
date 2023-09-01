<template>
  <section class="bg-white br-4">
    <header>
      <p class="line-h-42 text-center">
        <span
          class="fs-18 text-gray-500 font-bold relative ml-24 px-6 z-1 after:content-[''] after:block after:absolute after:b-0 after:left-0 after:w-full after:h-5 after:bg-green-400 after:z-[-1]"
        >
          {{ props.title }}
        </span>
      </p>
    </header>
    <main class="p-24">
      <slot name="default">
        <p class="text-center">什么也没有</p>
      </slot>
    </main>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

const props = defineProps<Props>()
</script>
