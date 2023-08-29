<template>
  <div class="w-full h-full overflow-auto">
    <div class="w-1400 relative m-auto mt-24 p-24 flex flex-col gap-12">
      <el-page-header :icon="ArrowLeft" @back="router.back()">
        <template #content>
          <span class="text-large font-600 mr-3">学生成长画像</span>
        </template>
      </el-page-header>
      <PortraitCard title="个人信息">
        <UserInfo />
      </PortraitCard>
      <PortraitCard class="flex-1" title="我的成长雷达图">
        <GrowthEvaluationChart />
      </PortraitCard>
      <div class="flex gap-12">
        <PortraitCard class="flex-1" title="我的获奖">
          <AwardRecord />
        </PortraitCard>
        <PortraitCard class="flex-1" title="我参加的活动">
          <ActivityRecord />
        </PortraitCard>
      </div>
      <PortraitCard title="学期成长排名曲线图">
        <GradeScoreChart />
      </PortraitCard>
      <PortraitCard title="成长分析">
        <GrowthStatus />
      </PortraitCard>
      <PortraitCard title="学习成绩">
        <FinalGradeChart />
      </PortraitCard>
      <PortraitCard title="成长记录">
        <GrowthRecord />
      </PortraitCard>
    </div>
  </div>
</template>

<script setup lang="ts" name="Portrait">
import PortraitCard from './components/PortraitCard.vue'
import UserInfo from './components/UserInfo.vue'
import GrowthEvaluationChart from './components/GrowthEvaluationChart.vue'
import AwardRecord from './components/AwardRecord.vue'
import GrowthStatus from './components/GrowthStatus.vue'
import ActivityRecord from './components/ActivityRecord.vue'
import GrowthRecord from './components/GrowthRecord/index.vue'
import FinalGradeChart from './components/FinalGradeChart.vue'
import GradeScoreChart from './components/GradeScoreChart.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
.portrait {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  &-wrapper {
    position: relative;
    margin: auto;
    width: 1240px;
    display: flex;
    gap: 20px;
    flex-direction: column;

    &__header {
      width: 100%;

      .portrait-header {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;

        &__center,
        &__right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        &__center {
          width: 600px;
        }
        &__right {
          width: 300px;
        }
      }
    }

    &__main {
      width: 100%;
    }

    &__footer {
      width: 100%;

      .portrait-footer {
        width: 100%;
        display: flex;
        gap: 20px;

        &__left,
        &__right {
          flex: 1;
        }
      }
    }
  }
}
</style>
