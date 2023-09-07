<template>
  <div class="p-20 w-full h-full" v-loading="loading">
    <el-card shadow="never" class="my-10">
      <el-form ref="searchRef" :model="search">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="专业" prop="majorName">
              <el-input v-model="search.majorName" />
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
          row-key="majorId"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup lang="ts" name="RankingMajor">
import { ref, onMounted } from 'vue'
import type { Column } from 'element-plus'
import type { MajorRankVO } from '@/api/ranking/major/type'
import { getMajorRank } from '@/api/ranking/major'

interface SearchDataType {
  facultyNameSet: Set<string>
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
    key: 'majorName',
    dataKey: 'majorName',
    title: '专业名称',
    width: 400,
  },
  {
    align: 'center',
    key: 'facultyName',
    dataKey: 'facultyName',
    title: '所属系部',
    width: 400,
  },
  {
    align: 'center',
    key: 'score',
    dataKey: 'score',
    title: '成长值',
    width: 200,
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
let dataSource: readonly MajorRankVO[]
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
  facultyNameSet: new Set(),
})

onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await getMajorRank()
    dataSource = Object.freeze(data)
    tableData.value = dataSource
    dataSource.forEach(
      (item) =>
        item.facultyName &&
        searchData.value.facultyNameSet.add(item.facultyName),
    )
  } finally {
    loading.value = false
  }
}

const filterSearchHandler = () => {
  const { majorName, facultyName } = search.value
  tableData.value = dataSource.filter((item) => {
    if (majorName && !item.majorName.includes(majorName)) {
      return false
    }
    return !(facultyName && item.facultyName !== facultyName)
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
