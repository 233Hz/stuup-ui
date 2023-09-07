<template>
  <div class="p-20 w-full h-full" v-loading="loading">
    <el-card shadow="never" class="my-10">
      <el-form ref="searchRef" :model="search">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="班级名称" prop="className">
              <el-input v-model="search.className" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="年级" prop="gradeName">
              <el-select v-model="search.gradeName" style="width: 100%">
                <el-option
                  v-for="item in searchData.gradeNameSet"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="系部" prop="facultyName">
              <el-select v-model="search.facultyName" style="width: 100%">
                <el-option
                  v-for="item in searchData.facultyNameSet"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="专业" prop="majorName">
              <el-select v-model="search.majorName" style="width: 100%">
                <el-option
                  v-for="item in searchData.majorNameSet"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-space>
              <el-button
                type="primary"
                icon="Search"
                :loading="loading"
                plain
                @click="filterSearchHandler"
              >
                查询
              </el-button>
              <el-button icon="Close" @click="searchRef?.resetFields()" plain>
                清空
              </el-button>
              <el-button
                icon="Refresh"
                :loading="loading"
                plain
                @click="fetchData"
              >
                刷新
              </el-button>
            </el-space>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="tableData"
          :width="width"
          :height="height"
          :class="kls"
          :cell-props="cellProps"
          row-key="classId"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup lang="ts" name="RankingClass">
import { ref, onMounted } from 'vue'
import type { Column } from 'element-plus'
import type { ClassRankVO } from '@/api/ranking/class/type'
import { getClassRank } from '@/api/ranking/class'

interface SearchDataType {
  gradeNameSet: Set<string>
  facultyNameSet: Set<string>
  majorNameSet: Set<string>
}

const columns: Column[] = [
  {
    align: 'center',
    key: 'rank',
    dataKey: 'rank',
    title: '排名',
    width: 50,
  },
  {
    align: 'center',
    key: 'className',
    dataKey: 'className',
    title: '班级名称',
    width: 300,
  },
  {
    align: 'center',
    key: 'classTeacher',
    dataKey: 'classTeacher',
    title: '班主任',
    width: 150,
  },
  {
    align: 'center',
    key: 'gradeName',
    dataKey: 'gradeName',
    title: '所属年级',
    width: 150,
  },
  {
    align: 'center',
    key: 'facultyName',
    dataKey: 'facultyName',
    title: '所属系部',
    width: 300,
  },
  {
    align: 'center',
    key: 'majorName',
    dataKey: 'majorName',
    title: '所属专业',
    width: 300,
  },
  {
    align: 'center',
    key: 'score',
    dataKey: 'score',
    title: '成长值',
    width: 150,
  },
]
const cellProps = ({ columnIndex }: { columnIndex: number }) => {
  const key = `hovering-col-${columnIndex}`
  return {
    ['data-key']: key,
    onMouseenter: () => {
      kls.value = key
    },
    onMouseleave: () => {
      kls.value = ''
    },
  }
}
let dataSource: readonly ClassRankVO[]

const searchRef = ref()
const loading = ref<boolean>(false)
const tableData = ref<any>([])
const kls = ref<string>('')

const search = ref({
  className: void 0,
  gradeName: void 0,
  facultyName: void 0,
  majorName: void 0,
})

const searchData = ref<SearchDataType>({
  gradeNameSet: new Set(),
  facultyNameSet: new Set(),
  majorNameSet: new Set(),
})

onMounted(async () => {
  await fetchData()
})

// METHODS
const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await getClassRank()
    dataSource = Object.freeze(data)
    tableData.value = dataSource
    dataSource.forEach((item) => {
      item.gradeName && searchData.value.gradeNameSet.add(item.gradeName)
      item.facultyName && searchData.value.facultyNameSet.add(item.facultyName)
      item.majorName && searchData.value.majorNameSet.add(item.majorName)
    })
  } finally {
    loading.value = false
  }
}

const filterSearchHandler = () => {
  const { className, gradeName, facultyName, majorName } = search.value
  tableData.value = dataSource.filter((item) => {
    if (className && !item.className.includes(className)) {
      return false
    }
    if (gradeName && item.gradeName !== gradeName) {
      return false
    }
    if (facultyName && item.facultyName !== facultyName) {
      return false
    }
    return !(majorName && item.majorName !== majorName)
  })
}
</script>

<style>
.hovering-col-0 [data-key='hovering-col-0'],
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'],
.hovering-col-8 [data-key='hovering-col-8'],
.hovering-col-9 [data-key='hovering-col-9'],
.hovering-col-10 [data-key='hovering-col-10'] {
  background: var(--el-table-row-hover-bg-color);
}

[data-key='hovering-col-0'] {
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
</style>
