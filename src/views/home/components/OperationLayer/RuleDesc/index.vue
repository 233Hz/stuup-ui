<template>
  <el-dialog
    v-model="visible"
    title="积分规则说明"
    width="60%"
    top="20px"
    center
  >
    <div v-loading="loading">
      <el-alert title="项目规则说明" type="success" show-icon>
        <template #default>
          <div class="line-h-16">
            <p>1.每个项目都有对应的项目积分，为每次采集加/减去的分数</p>
            <p>
              2.项目采集分为“不限、每天、每周、每月、每学期、每学年”六个周期，除了“不限”，其他采集周期都要对应的周期的分数上限的限制，周期内采集获取的分数超过上限减不会再统计
            </p>
            <p>
              3.项目分为“采集加分”和“采集减分”类型，”采集加分“的同学按照项目分数乘以采集次数统计获得的分数（超过上限不计），”采集减分“的同学采集周期内无违规的采集记录会默认获得周期内上限默认分，有违规记录的同学将根据周期内采集违规次数和项目积分统计总扣分，获得采集周期上限扣除总扣分剩余的分数
            </p>
          </div>
        </template>
      </el-alert>
      <el-table
        :data="tableData"
        :span-method="arraySpanMethod"
        border
        class="mt-10"
      >
        <el-table-column prop="l1" label="一级项目" align="center" />
        <el-table-column prop="l2" label="二级项目" align="center" />
        <el-table-column prop="l3" label="三级项目" align="center" />
        <el-table-column prop="name" label="项目名称" align="center" />
        <el-table-column prop="cycle" label="采集周期" align="center">
          <template #default="{ row }">
            {{ PERIOD.getKeyForValue(row.cycle) }}
          </template>
          <template #header="{ column }">
            <el-space>
              <el-popover placement="top-start" :width="400" trigger="hover">
                <template #reference>
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </template>
                <template #default>
                  <el-text type="info" size="large">周期类型分为：</el-text>
                  不限、每天、每周、每月、每学期、每学年
                  <br />
                  <el-text type="info" size="large">不限：</el-text>
                  每次采集都会计算项目分数
                  <br />
                  <el-text type="info" size="large">其他：</el-text>
                  除了不限，其他周期都会对应的周期内可获取分数的上限，超过上限的分数不会统计
                </template>
              </el-popover>
              <span>{{ column.label }}</span>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column
          prop="cycleUpperLimit"
          label="采集周期内分数上限"
          align="center"
        >
          <template #default="{ row }">
            {{ row.cycleUpperLimit ? `${row.cycleUpperLimit}分` : '无' }}
          </template>
          <template #header="{ column }">
            <div class="flex justify-center items-center gap-4">
              <el-popover placement="top-start" :width="400" trigger="hover">
                <template #reference>
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </template>
                <template #default>
                  除了不限，其他周期都会对应的周期内可获取分数的上限，超过上限的分数不会统计
                </template>
              </el-popover>
              <span>{{ column.label }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="项目积分" align="center">
          <template #default="{ row }">
            {{ row.score ? `${row.score}分` : '无' }}
          </template>
        </el-table-column>
        <el-table-column prop="calculateType" label="计算类型" align="center">
          <template #default="{ row }">
            {{ CALCULATE_TYPE.getKeyForValue(row.calculateType) }}
          </template>
          <template #header="{ column }">
            <div class="flex justify-center items-center gap-4">
              <el-popover placement="top-start" :width="400" trigger="hover">
                <template #reference>
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </template>
                <template #default>
                  <el-text type="info" size="large">录入加分：</el-text>
                  根据周期时间段内统计采集的次数乘以项目积分加分，超出上限的分数不会再加分
                  <br />
                  <el-text type="info" size="large">录入减分：</el-text>
                  周期内无违规采集记录的同学获得本次周期内的分数上限的积分，周期内有违规采集记录的同学
                  根据周期时间段内统计采集的次数乘以项目积分得出扣分，获得项目周期分数上限扣除违规分数的积分
                </template>
              </el-popover>
              <span>{{ column.label }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqGrowthRuleDesc } from '@/api/grow/config'
import { CALCULATE_TYPE, PERIOD } from '@/utils/dict'
import type { GrowthRuleDesc } from '@/api/grow/config/type'
import type { TableColumnCtx } from 'element-plus'

interface SpanMethodProps {
  row: GrowthRuleDesc
  column: TableColumnCtx<GrowthRuleDesc>
  rowIndex: number
  columnIndex: number
}

const visible = ref(false)
const loading = ref(false)
const tableData = ref<GrowthRuleDesc[]>([])

const show = async () => {
  visible.value = true
  await fetchData()
}
const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await reqGrowthRuleDesc()
    tableData.value = data || []
  } finally {
    loading.value = false
  }
}

const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex === 0 || row.l1Id != tableData.value[rowIndex - 1].l1Id) {
      let rowspan = 0
      tableData.value.forEach((element) => {
        if (element.l1Id === row.l1Id) {
          rowspan++
        }
      })
      return [rowspan, 1]
    } else {
      return [0, 0]
    }
  }
  if (columnIndex === 1) {
    if (
      (rowIndex === 0 || row.l2Id != tableData.value[rowIndex - 1].l2Id) &&
      row.l2Id
    ) {
      let rowspan = 0
      tableData.value.forEach((element) => {
        if (element.l2Id === row.l2Id) {
          rowspan++
        }
      })
      return [rowspan, 1]
    } else {
      return [0, 0]
    }
  }
  if (columnIndex === 2) {
    if (
      (rowIndex === 0 || row.l3Id != tableData.value[rowIndex - 1].l3Id) &&
      row.l3Id
    ) {
      let rowspan = 0
      tableData.value.forEach((element) => {
        if (element.l3Id === row.l3Id) {
          rowspan++
        }
      })
      return [rowspan, 1]
    } else {
      return [0, 0]
    }
  }
  if (columnIndex === 3) {
    if (!row.l2Id) {
      return [1, 3]
    } else if (!row.l3Id) {
      return [1, 2]
    }
  }
}

defineExpose({ show })
</script>
