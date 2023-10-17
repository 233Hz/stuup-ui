<script setup lang="ts">
import { ref, onMounted } from 'vue'
import defaultAvatar from '@/assets/icons/default-avatar.svg'
import ModuleTitle from '../ModuleTitle/index.vue'
import { reqGrowthReportBasicInfo } from '@/api/growthReport'

const { studentId } = defineProps<{
  studentId?: number
}>()

interface ConfigMap {
  [key: string]: {
    label: string
    default: string
    icon: string
  }
}

const configMap: ConfigMap = {
  studentName: { label: '姓名', default: '无', icon: 'report-icon-name' },
  gender: { label: '张三', default: '无', icon: 'report-icon-gender' },
  ethnicGroup: { label: '民族', default: '无', icon: 'report-icon-nation' },
  className: { label: '班级', default: '无', icon: 'report-icon-class' },
  majorName: { label: '专业', default: '无', icon: 'report-icon-major' },
  homeAddress: {
    label: '家庭住址',
    default: '无',
    icon: 'report-icon-address',
  },
  dateOfBirth: {
    label: '出生年月',
    default: '无',
    icon: 'report-icon-birthday',
  },
  politicalStatus: {
    label: '政治面貌',
    default: '无',
    icon: 'report-icon-political',
  },
  idCard: { label: '身份证号', default: '无', icon: 'report-icon-id-card' },
  phone: { label: '联系电话', default: '无', icon: 'report-icon-phone' },
  academicStatus: {
    label: '学业状态',
    default: '无',
    icon: 'report-icon-study-status',
  },
  militaryTrainingLevel: {
    label: '军事训练等级',
    default: '无',
    icon: 'report-icon-military',
  },
}

const avatar = ref<string>()
const data = ref()

const fetchData = async () => {
  const { data: res } = await reqGrowthReportBasicInfo(studentId)
  avatar.value = res.avatarUrl
  data.value = Object.keys(configMap).map((key) => {
    return {
      key,
      icon: configMap[key].icon,
      label: configMap[key].label,
      value: res[key] || configMap[key].default,
    }
  })
}

onMounted(() => {
  fetchData()
})
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
        <img
          class="w-full h-full object-fit"
          :src="avatar || defaultAvatar"
          alt="头像"
        />
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
            <p class="text-[14px] text-white font-bold">{{ item.label }}</p>
            <p class="text-[16px] text-[#f88a00] font-thin">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
