<template>
  <div class="portrait">
    <div class="portrait-wrapper">
      <div class="portrait-wrapper__header">
        <div class="portrait-header">
          <div class="portrait-header__left">
            <UserInfo />
          </div>
          <div class="portrait-header__center">
            <portrait-card title="成长状态">
              <GrowthEvaluationChart />
            </portrait-card>
            <portrait-card title="每学期积分">
              <GradeScoreChart />
            </portrait-card>
          </div>
          <div class="portrait-header__right">
            <portrait-card title="获奖记录">
              <AwardRecord />
            </portrait-card>
            <portrait-card title="参加活动记录">
              <ActivityRecord />
            </portrait-card>
          </div>
        </div>
      </div>
      <div class="portrait-wrapper__main">
        <portrait-card title="历史成长记录">
          <GrowthRecord />
        </portrait-card>
      </div>
      <div class="portrait-wrapper__footer">
        <div class="portrait-footer">
          <div class="portrait-footer__left">
            <portrait-card title="学习成绩">
              <FinalGradeChart />
            </portrait-card>
          </div>
          <div class="portrait-footer__right">
            <portrait-card title="每学期积分">
              <GradeScoreChart />
            </portrait-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfo from './components/UserInfo.vue';
import PortraitCard from './components/PortraitCard.vue';
import GrowthEvaluationChart from './components/GrowthEvaluationChart.vue';
import AwardRecord from './components/AwardRecord.vue';
import ActivityRecord from './components/ActivityRecord.vue';
import GrowthRecord from './components/GrowthRecord.vue';
import FinalGradeChart from './components/FinalGradeChart.vue';
import GradeScoreChart from './components/GradeScoreChart.vue';
</script>

<style scoped lang="scss">
.portrait {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
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
