<template>
  <div class="container" v-for="item in 100" :key="item">{{ item }}</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: center;
}
</style>
