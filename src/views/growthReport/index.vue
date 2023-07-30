<template>
  <div class="w-full h-full overflow-auto">
    <div class="w-1400 m-auto flex flex-col gap-10 text-sky-900">
      <div class="p-10 text-center">
        <h1>
          <span class="fs-32 text-black">个人成长报告</span>
        </h1>
      </div>
      <div>
        <p class="mt-24"><span class="ml-10 fs-18 text-black font-semibold text-current">用户信息</span></p>
      </div>
      <div class="bg-white p-24 flex">
        <div class="w-200 relative">
          <img :src="defaultAvatar" alt="张三" class="w-160 h-160 object-cover block m-auto" />
        </div>
        <div class="flex-1">
          <div><a class="fs-24 text-gray-900 cursor-pointer hover:text-sky-500 font-bold">张三</a></div>
          <div class="flex gap-10 mt-24">
            <div class="min-w-100 border border-dashed border-gray-300 px-10 py-5 rounded-md">
              <p><span class="fs-24 text-black font-bold">10000</span></p>
              <p><span class="fs-14 text-gray-400">总成长值</span></p>
            </div>
            <div class="min-w-100 border border-dashed border-gray-300 px-12 py-8 rounded-md">
              <p><span class="fs-24 text-black font-bold">1</span></p>
              <p><span class="fs-14 text-gray-400">当前排名</span></p>
            </div>
          </div>
          <div class="fs-16 mt-24">
            <span class="rounded bg-green-400 text-white p-4">
              超过当前&nbsp;&nbsp;
              <em class="font-bold">100%</em>
              &nbsp;&nbsp;的同学
            </span>
          </div>
        </div>
      </div>
      <div>
        <p class="mt-24"><span class="ml-10 fs-18 text-black font-semibold text-current">成长值</span></p>
      </div>
      <div class="fs-16 p-24 bg-white">
        <SemesterScoreChart />
      </div>
      <div>
        <p class="mt-24"><span class="ml-10 fs-18 text-black font-semibold text-current">成长排名</span></p>
      </div>
      <div class="fs-16 p-24 bg-white">
        <SemesterRankChart />
      </div>
      <div>
        <p class="mt-24"><span class="ml-10 fs-18 text-black font-semibold text-current">成长对比</span></p>
      </div>
      <div class="fs-16 p-24 bg-white">
        <p class="line-h-24">
          <span>
            您有
            <strong class="text-green-500">1</strong>
            项成长值
            <strong class="text-green-500">超过</strong>
            平均分
          </span>
        </p>
        <p class="line-h-24">
          <span>
            您有
            <strong class="text-red-500">10</strong>
            项成长值
            <strong class="text-red-500">低于</strong>
            过平均分
          </span>
        </p>
      </div>
      <div class="p-24 bg-white">
        <CompartChart />
      </div>
      <div>
        <p class="mt-24"><span class="ml-10 fs-18 text-black font-semibold text-current">学习成绩</span></p>
      </div>
      <div class="p-24 bg-white">
        <SemesterGradeChart />
      </div>
      <div>
        <p class="mt-24"><span class="ml-10 fs-18 text-black font-semibold text-current">成长分析</span></p>
      </div>
      <div class="p-24 bg-white">
        <GrowthAnalysisChart />
      </div>
      <div>
        <p class="mt-24"><span class="ml-10 fs-18 text-black font-semibold text-current">成长积分占比</span></p>
      </div>
      <div class="p-24 bg-white">
        <GrowthScoreRatioAnalysisChart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/image/default_avatar.png';
import CompartChart from './components/CompareChart.vue';
import SemesterScoreChart from './components/SemesterScoreChart.vue';
import SemesterRankChart from './components/SemesterRankChart.vue';
import SemesterGradeChart from './components/SemesterGradeChart.vue';
import GrowthAnalysisChart from './components/GrowthAnalysisChart.vue';
import GrowthScoreRatioAnalysisChart from './components/GrowthScoreRatioAnalysisChart.vue';
</script>
