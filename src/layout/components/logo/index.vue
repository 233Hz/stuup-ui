<template>
  <div class="logo" v-if="setting.showLogo" @click="router.push('/dashboard')">
    <div class="picture">
      <img :src="setting.logo" alt="logo" />
    </div>
    <div class="title">{{ setting.title }}</div>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
$logo-picture-weith: 161px;
$logo-picture-height: 99px;

.logo {
  height: 100%;
  display: flex;
  cursor: pointer;

  .picture {
    width: 80px;
    height: 100%;
    display: flex;

    > img {
      width: math.div($logo-picture-weith, 3);
      height: math.div($logo-picture-height, 3);
      margin: auto;
      object-fit: cover;
    }
  }
  .title {
    flex: 1;
    height: 100%;
    font-size: 24px;
    font-weight: 600;
    line-height: var(--header-height);
  }
}

@media only screen and (max-width: 768px) {
  .title {
    display: none;
  }
}
</style>
