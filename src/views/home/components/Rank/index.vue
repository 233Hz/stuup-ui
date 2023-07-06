<template>
  <div class="rank" v-show="show">
    <div class="rank-wrapper">
      <RankItem1 rank-name="学年全校排行榜" :data="generateRankData1()" />
      <RankItem2 rank-name="学年班级排行榜" :data="generateRankData2()" />
      <RankItem1 rank-name="每月进步榜" background-color="color4" :data="generateRankData3()">
        <template #default="{ row }">
          <div style="font-size: 20px; color: #67c5ce">↑{{ row.rankChange }}</div>
        </template>
      </RankItem1>
    </div>
    <div class="rank-close" @click="show = false">
      <div class="rank-close__icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RankItem1 from './RankItem1.vue';
import RankItem2 from './RankItem2.vue';

const generateRankData1 = () => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      id: index + 1,
      studentName: '张三',
      className: `${index + 1}班`,
      classTeacher: '李四',
      score: Math.floor(Math.random() * 1000),
      rank: index + 1,
    };
  });
};
const generateRankData2 = () => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      id: index + 1,
      classTeacher: '李四',
      className: `${index + 1}班`,
      score: Math.floor(Math.random() * 1000),
      rank: index + 1,
    };
  });
};
const generateRankData3 = () => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      id: index + 1,
      studentName: '张三',
      className: `${index + 1}班`,
      classTeacher: '李四',
      score: Math.floor(Math.random() * 1000),
      rank: index + 1,
      rankChange: Math.floor(Math.random() * 100),
    };
  });
};

const show = ref<boolean>(false);

const open = () => {
  show.value = true;
};

defineExpose({ open });
</script>

<style scoped lang="scss">
.rank {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 遮罩层背景颜色和透明度 */
    z-index: -1;
  }

  &-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;

    &__icon {
      position: relative;
      width: 100%;
      height: 100%;
      transition: 0.3s;
      transform-origin: center;
      border-radius: 50%;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 5px;
        border-radius: 8px;
        background-color: white;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 5px;
        border-radius: 8px;
        background-color: white;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &:hover {
        cursor: pointer;
        background-color: #fa8bff;
        background-image: linear-gradient(45deg, #fa8bff 0%, #2bd2ff 52%, #2bff88 90%);
        transform: rotate(90deg);
      }
    }
  }
}
</style>
