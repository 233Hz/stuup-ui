<template>
  <div style="margin: 20px">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 20px">
        <el-card shadow="never">
          <template #header>系统通知</template>
          <el-skeleton :rows="10" animated :loading="loading">
            <el-scrollbar height="600px">
              <div
                class="message-item"
                v-for="(item, index) in systemMags"
                :key="item.id"
                @click="router.push('/system/announcement')">
                <span class="message-item__title">{{ index + 1 }}. {{ item.title }}</span>
                <br />
                <span class="message-item__time">创建时间：{{ item.createTime }}</span>
              </div>
            </el-scrollbar>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 20px">
        <el-card shadow="never">
          <template #header>活动公告</template>
          <el-skeleton :rows="10" animated :loading="loading">
            <el-scrollbar height="600px">
              <div
                class="message-item"
                v-for="(item, index) in activeMags"
                :key="item.id"
                @click="router.push('/system/announcement')">
                <span class="message-item__title">{{ index + 1 }}. {{ item.title }}</span>
                <br />
                <span class="message-item__time">创建时间：{{ item.createTime }}</span>
              </div>
            </el-scrollbar>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="never">
          <template #header>快捷入口</template>
          <el-skeleton :rows="10" animated :loading="loading">
            <div class="bunga-icon">
              <div class="bunga-icon__wrapper">
                <div class="bunga-icon__item" @click="router.push('/system/user')">
                  <img :src="userinfo" />
                  用户信息
                </div>
                <div class="bunga-icon__item" @click="router.push('/grow/project')">
                  <img :src="project" />
                  成长项目设置
                </div>
                <div class="bunga-icon__item" @click="router.push('/grow/model')">
                  <img :src="model" />
                  成长模型
                </div>
                <div class="bunga-icon__item" @click="router.push('/collect')">
                  <img :src="collect" />
                  数据采集
                </div>
                <div class="bunga-icon__item" @click="router.push('/record/growScore')">
                  <img :src="record" />
                  采集记录
                </div>
                <div class="bunga-icon__item" @click="router.push('/ranking/school_stu')">
                  <img :src="ranking" />
                  成长排名
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAnnouncementMyPage } from '@/api/system/announcement';
import { ANNOUNCEMENT_TYPE } from '@/utils/dict';
import project from '@/assets/svg/project.svg';
import model from '@/assets/svg/model.svg';
import collect from '@/assets/svg/collect.svg';
import record from '@/assets/svg/record.svg';
import ranking from '@/assets/svg/ranking.svg';
import userinfo from '@/assets/svg/userinfo.svg';

const router = useRouter();

const loading = ref<boolean>(false);
const systemMags = ref();
const activeMags = ref();

onMounted(() => {
  initMsg();
});

const initMsg = async () => {
  loading.value = true;
  try {
    const { data } = await getAnnouncementMyPage();
    systemMags.value = data.records.filter(item => item.type === ANNOUNCEMENT_TYPE.SYSTEM);
    activeMags.value = data.records.filter(item => item.type === ANNOUNCEMENT_TYPE.ACTIVE);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.message-item {
  padding: 20px;
  font-family: 'Microsoft YaHei', 微软雅黑, 'Microsoft JhengHei', 华文细黑, STHeiti, MingLiu;

  &__title {
    font-size: 16px;
  }
  &__time {
    font-size: 12px;
    color: #999;
  }

  &:hover {
    color: #1a8e00;
    cursor: pointer;
  }
}
@include b(icon) {
  width: 100%;
  display: flex;
  @include e(wrapper) {
    width: 900px;
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
    margin: 75px;
    text-align: center;
    font-size: 18px;
    color: #1a8e00;
    font-weight: 900;
    > img {
      -webkit-user-drag: none;
      width: 150px;
      height: 150px;
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
}
</style>
