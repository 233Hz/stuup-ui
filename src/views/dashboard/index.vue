<template>
  <div style="margin: 20px">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 20px">
        <el-card shadow="never" :style="{ height: `${height}px` }">
          <template #header>系统通知</template>
          <el-skeleton :rows="10" animated :loading="loading">
            <div>
              <ul>
                <li>aaaaaaaa</li>
              </ul>
            </div>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 20px">
        <el-card shadow="never" :style="{ height: `${height}px` }">
          <template #header>活动公告</template>
          <el-skeleton :rows="10" animated :loading="loading">aaa</el-skeleton>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="never">
          <template #header>快捷入口</template>
          <el-skeleton :rows="10" animated :loading="loading">
            <div class="bunga-icon">
              <div class="bunga-icon__wrapper">
                <div class="bunga-icon__item" v-for="(item, index) in Object.keys(flowers)" :key="index">
                  <img :src="item" />
                  测试
                </div>
              </div>
            </div>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const flowers = import.meta.glob('/src/assets/flower_icons/**.*', { import: 'default', eager: true });

const height = 600;

const loading = ref<boolean>(false);
</script>

<style scoped lang="scss">
@include b(icon) {
  width: 100%;
  display: flex;
  @include e(wrapper) {
    width: 1140px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  @include e(item) {
    user-select: none;
    position: relative;
    width: 150px;
    height: 150px;
    margin: 20px;
    text-align: center;
    font-size: 18px;
    color: #1a8e00;
    font-weight: 900;
    > img {
      -webkit-user-drag: none;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
}
</style>
