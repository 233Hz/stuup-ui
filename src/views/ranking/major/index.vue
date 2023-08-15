<template>
  <div shadow="never" class="p-20 w-full h-full" v-loading="loading">
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

<script setup lang="tsx" name="RankingMajor">
import { ref, onMounted } from 'vue'
import type { Column } from 'element-plus'
import type { MajorRankVO } from '@/api/ranking/major/type'
import { getMajorRank } from '@/api/ranking/major/index'
import { ElButton, ElSelectV2, ElIcon, ElPopover } from 'element-plus'
import { Filter } from '@element-plus/icons-vue'

import type { HeaderCellSlotProps } from 'element-plus'

// TYPE
interface FilterFormType {
  majorName: string
  facultyName: string
}

type FilterDataItem = {
  label: string
  value: string
}

interface FilterDataType {
  facultyName: readonly FilterDataItem[]
}

// CONST
const columns: Column[] = [
  {
    align: 'center',
    dataKey: 'rank',
    title: '排名',
    width: 50,
  },
  {
    align: 'center',
    dataKey: 'majorName',
    title: '专业名称',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover
            v-model:visible={visible1.value}
            trigger="click"
            {...{ width: 200 }}
          >
            {{
              default: () => (
                <div>
                  <div>
                    <el-input
                      v-model={filterForm.value.majorName}
                      placeholder="请输入专业名称"
                    />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton
                      text
                      onClick={() =>
                        onReset(props.column.dataKey as keyof FilterFormType)
                      }
                    >
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      )
    },
  },
  {
    align: 'center',
    dataKey: 'facultyName',
    title: '所属系部',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover
            v-model:visible={visible2.value}
            trigger="click"
            {...{ width: 200 }}
          >
            {{
              default: () => (
                <div>
                  <div>
                    <ElSelectV2
                      v-model={filterForm.value.facultyName}
                      options={[...filterData.facultyName]}
                      placeholder="请选择系部"
                      teleported={false}
                    />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton
                      text
                      onClick={() =>
                        onReset(props.column.dataKey as keyof FilterFormType)
                      }
                    >
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      )
    },
  },
  {
    align: 'center',
    dataKey: 'score',
    title: '成长值',
    width: 100,
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

const filterData: FilterDataType = {
  facultyName: [],
}

// DATA
let data: readonly MajorRankVO[]
const loading = ref<boolean>(false)
const tableData = ref<MajorRankVO[]>([])
const kls = ref<string>('')
const visible1 = ref(false)
const visible2 = ref(false)
const filterForm = ref<FilterFormType>({
  facultyName: '',
  majorName: '',
})

// ONMOUNTED
onMounted(() => {
  fetchList()
})

// METHOD
const fetchList = async () => {
  loading.value = true
  try {
    const { data: res } = await getMajorRank()
    data = Object.freeze(res)
    tableData.value = [...data]
    let facultyName = new Set<string>()
    data.forEach((item) => facultyName.add(item.facultyName))
    filterData.facultyName = [...facultyName].map((item) => {
      return {
        label: item,
        value: item,
      }
    })
  } finally {
    loading.value = false
  }
}

const onFilter = () => {
  const { majorName, facultyName } = filterForm.value

  tableData.value = data.filter((item) => {
    if (majorName && !item.majorName.includes(majorName)) {
      return false
    }
    if (facultyName && item.facultyName !== facultyName) {
      return false
    }
    return true
  })
}
const onReset = (columnKey: keyof FilterFormType) => {
  filterForm.value[columnKey] = ''
  onFilter()
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
