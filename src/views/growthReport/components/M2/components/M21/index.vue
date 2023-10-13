<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleCard from '../../../ModuleCard/index.vue'

const subjects = [
  '语文',
  '数学',
  '英语',
  '物理',
  '化学',
  '生物',
  '地理',
  '政治',
  '历史',
]

const semester = ref('一')

interface Data {
  semester: string
  total: number
  subjects: {
    name: string
    score: number
  }[]
}
const data = ref<Data>()

const mock_data = (semester: string) => {
  const newSubjects = subjects.map((subject) => {
    return {
      name: subject,
      score: Math.floor(Math.random() * 80) + 20,
    }
  })
  const totalSCore = newSubjects.reduce((prev, curr) => {
    return prev + curr.score
  }, 0)
  return {
    semester: `第${semester}学期`,
    total: totalSCore,
    subjects: newSubjects,
  }
}

const semesterChangeHandler = (val: string) => {
  data.value = mock_data(val)
}

onMounted(() => {
  data.value = mock_data(semester.value)
})
</script>

<template>
  <module-card header-left-text="学科成绩" color="#fd3d7f33">
    <template #headerRight>
      <el-select
        v-model="semester"
        placeholder="请选择学期"
        size="small"
        @change="semesterChangeHandler"
      >
        <el-option label="第一学期" value="一" />
        <el-option label="第二学期" value="二" />
        <el-option label="第三学期" value="三" />
        <el-option label="第四学期" value="四" />
        <el-option label="第五学期" value="五" />
        <el-option label="第六学期" value="六" />
      </el-select>
    </template>
    <div class="p-[10px]">
      <table class="w-full">
        <thead align="center">
          <tr>
            <th>学期</th>
            <th>期末总分</th>
            <th colspan="2">期末各课程成绩</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr v-for="(item, index) in data?.subjects" :key="index">
            <td v-if="index === 0" :rowspan="data?.subjects.length">
              {{ data?.semester }}
            </td>
            <td v-if="index === 0" :rowspan="data?.subjects.length">
              {{ data?.total }}
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </module-card>
</template>

<style scoped lang="scss">
table,
th,
td {
  border: 1px solid #fd3d7f;
  vertical-align: middle;
}

th,
td {
  line-height: 30px;
  color: white;
}

thead {
  background-color: #fd3d7f4d;
}
</style>
