<template>
  <div class="container">
    <div class="hover-container"></div>
    <transition name="fade">
      <div v-show="show" class="content">
        <el-tabs v-model="activeName">
          <el-tab-pane label="荣耀榜" name="school" />
          <el-tab-pane label="班级榜" name="class" />
          <el-tab-pane label="进步榜" name="progress" />
        </el-tabs>

        <!-- <el-auto-resizer v-loading="loading">
          <template #default="{ width }">
            <el-table-v2 :columns="columns" :data="tableData" :width="width" />
          </template>
        </el-auto-resizer> -->

        <el-table
          :data="tableData"
          stripe
          v-loading="loading"
          empty-text="空空如也~~"
          style="width: 100%"
        >
          <el-table-column
            label="排名"
            type="index"
            width="55"
            align="center"
          />
          <el-table-column
            prop="studentName"
            label="学生姓名"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="studentNo"
            label="学号"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="className"
            label="所属班级"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="classTeacher"
            label="班主任"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="score"
            label="成长值"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column label="成长等级" align="center">
            <template #default="{ row }">
              <flower-level-icon :score="row.score" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getSchoolRank } from '@/api/ranking/school'
import useUserStore from '@/store/modules/user'
import FlowerLevelIcon from '@/components/FlowerLevelIcon.vue'

const userStore = useUserStore()

const activeName = ref('school')
const tableData = ref()
const loading = ref<boolean>(false)
const show = ref<boolean>(false)

const columns = [
  { dataKey: 'year', key: 'year', title: '年份', width: 100 },
  { dataKey: 'month', key: 'month', title: '月份', width: 100 },
  { dataKey: 'studentName', key: 'studentName', title: '学生姓名', width: 100 },
  { dataKey: 'studentNo', key: 'studentNo', title: '学号', width: 100 },
  { dataKey: 'gradeName', key: 'gradeName', title: '所属年级', width: 100 },
  { dataKey: 'className', key: 'className', title: '所属班级', width: 100 },
  { dataKey: 'classTeacher', key: 'classTeacher', title: '班主任', width: 100 },
  { dataKey: 'facultyName', key: 'facultyName', title: '所属系部', width: 100 },
  { dataKey: 'majorName', key: 'majorName', title: '所属专业', width: 100 },
  { dataKey: 'score', key: 'score', title: '获得成长值', width: 100 },
  {
    dataKey: 'progressState',
    key: 'progressState',
    title: '进步状态',
    width: 100,
  },
]

let hoverContainer: HTMLDivElement
let container: HTMLDivElement
const page = ref({
  current: 1,
  size: 10,
})

onMounted(() => {
  hoverContainer = document.querySelector('.hover-container') as HTMLDivElement
  container = document.querySelector('.container') as HTMLDivElement
  // 排行榜按钮移入事件
  hoverContainer.addEventListener('mouseenter', () => {
    show.value = true
  })
  // 排行榜按钮移入事件
  container.addEventListener('mouseleave', () => (show.value = false))
  fetchList()
})

onUnmounted(() => {
  hoverContainer.removeEventListener('mouseenter', () => {})
  container.removeEventListener('mouseleave', () => {})
})

const fetchList = async () => {
  loading.value = true
  try {
    const { data: res } = await getSchoolRank(
      Object.assign(page.value, { yearId: userStore.getYearId }),
    )
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.container {
  .hover-container {
    width: 10rem;
    height: 5rem;
    border-radius: 0 0 5rem 5rem;
    box-sizing: border-box;
  }
  .content {
    width: 30rem;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
  }
}
</style>
