<script setup lang="ts">
import { ref } from 'vue'
import defaultAvatar from '@/assets/icons/default-avatar.svg'
import ModuleTitle from '../ModuleTitle/index.vue'

const data = ref([
  {
    key: 'name',
    name: '姓名:',
    icon: 'report-icon-name',
    value: '张三',
  },
  {
    key: 'gender',
    name: '性别:',
    icon: 'report-icon-gender',
    value: '男',
  },
  {
    key: 'nation',
    name: '民族:',
    icon: 'report-icon-nation',
    value: '汉族',
  },
  {
    key: 'class',
    name: '班级:',
    icon: 'report-icon-class',
    value: '202301班',
  },
  {
    key: 'major',
    name: '专业:',
    icon: 'report-icon-major',
    value: '云计算',
  },
  {
    key: 'address',
    name: '家庭住址:',
    icon: 'report-icon-address',
    value: '上海市浦东新区',
  },
  {
    key: 'birthday',
    name: '出生年月:',
    icon: 'report-icon-birthday',
    value: '2023-01-01',
  },
  {
    key: 'political',
    name: '政治面貌:',
    icon: 'report-icon-political',
    value: '共青团员',
  },
  {
    key: 'idCard',
    name: '身份证号:',
    icon: 'report-icon-id-card',
    value: '921321200012128764',
  },
  {
    key: 'phone',
    name: '联系电话:',
    icon: 'report-icon-phone',
    value: '138888888888',
  },
  {
    key: 'studyStatus',
    name: '学业状态:',
    icon: 'report-icon-study-status',
    value: '在校',
  },
  {
    key: 'military',
    name: '军事训练等级:',
    icon: 'report-icon-military',
    value: '优秀',
  },
])
</script>

<template>
  <div>
    <module-title
      title="基本信息"
      :background1="['bg-gradient-to-r from-[#f88a00] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#f88a00] to-[#050c19]']"
    />
    <div class="flex gap-[40px]">
      <div class="w-[200px] h-[200px]">
        <img class="w-full h-full object-fit" :src="defaultAvatar" alt="头像" />
      </div>
      <div class="flex-1 grid grid-cols-3 gap-[10px]">
        <div class="flex gap-[20px]" v-for="item in data" :key="item.key">
          <div class="w-[60px] h-[60px]">
            <svg-icon
              :name="item.icon"
              width="50px"
              height="50px"
              color="#ffffff"
            />
          </div>
          <div class="flex-1 leading-[24px]">
            <p class="text-[14px] text-white font-bold">{{ item.name }}</p>
            <p class="text-[16px] text-[#f88a00] font-thin">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
