<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form
              ref="searchFormRef"
              :model="searchForm"
              label-width="100px"
            >
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="一级项目" prop="firstLevelId">
                    <el-select
                      v-model="searchForm.firstLevelId"
                      @change="firstLevelChange"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in FIRST_LEVEL"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="二级项目" prop="secondLevelId">
                    <el-select
                      v-model="searchForm.secondLevelId"
                      @change="secondLevelChange"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in SECOND_LEVEL"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="三级项目" prop="thirdLevelId">
                    <el-select
                      v-model="searchForm.thirdLevelId"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in THIRD_LEVEL"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="项目名称" prop="growName">
                    <el-input v-model="searchForm.growName" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="状态" prop="state">
                    <el-select v-model="searchForm.state" style="width: 100%">
                      <el-option
                        v-for="item in AUDIT_STATUS.getDict()"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <div style="text-align: center">
        <el-space>
          <el-button type="primary" @click="fetchList" :loading="loading">
            查询
          </el-button>
          <el-button @click="searchFormRef?.resetFields()">清空</el-button>
        </el-space>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <el-space>
          <el-divider direction="vertical" />
          <el-button :disabled="loading" circle @click="fetchList">
            <el-icon><Refresh /></el-icon>
          </el-button>
        </el-space>
      </template>
      <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        empty-text="空空如也~~"
        style="width: 100%"
      >
        <el-table-column
          prop="firstLevelName"
          label="一级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="secondLevelName"
          label="二级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="thirdLevelName"
          label="三级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="growName"
          label="成长项"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="applicant"
          label="提交人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="state"
          label="审核状态"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            <el-tag
              v-show="row.state === AUDIT_STATUS.TO_BE_SUBMITTED"
              type="info"
            >
              {{ AUDIT_STATUS.getKey('TO_BE_SUBMITTED') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.PENDING_REVIEW">
              {{ AUDIT_STATUS.getKey('PENDING_REVIEW') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.PASS" type="success">
              {{ AUDIT_STATUS.getKey('PASS') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.REFUSE" type="danger">
              {{ AUDIT_STATUS.getKey('REFUSE') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.RETURN" type="warning">
              {{ AUDIT_STATUS.getKey('RETURN') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button @click="auditInfoRef.open(row)">审核信息</el-button>
            <el-button
              :disabled="row.state !== AUDIT_STATUS.PENDING_REVIEW"
              type="success"
              @click="passRow(row.id)"
            >
              通过
            </el-button>
            <el-button
              :disabled="row.state !== AUDIT_STATUS.PENDING_REVIEW"
              type="danger"
              @click="refuseRow(row.id)"
            >
              拒绝
            </el-button>
            <el-button
              :disabled="row.state !== AUDIT_STATUS.PENDING_REVIEW"
              type="warning"
              @click="returnRow(row.id)"
            >
              退回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-r">
        <el-pagination
          background
          :disabled="loading"
          :total="total"
          v-model:current-page="searchForm.current"
          v-model:page-size="searchForm.size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>
    <AuditInfo ref="auditInfoRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  pageGrowAuditRecord,
  passGrowItem,
  refuseGrowItem,
  returnGrowItem,
} from '@/api/audit'
import { GrowthTreeVO, getGrowthTree } from '@/api/grow/config'
import { AUDIT_STATUS } from '@/utils/dict'
import AuditInfo from '@/components/AuditInfo.vue'

//DICT
const GROWTH_TREE = ref<GrowthTreeVO[]>([])
const FIRST_LEVEL = ref()
const SECOND_LEVEL = ref()
const THIRD_LEVEL = ref()

//REF
const searchFormRef = ref<FormInstance>()
const auditInfoRef = ref()

// DATA
const loading = ref<boolean>(false)
const tableData = ref([{}])
const total = ref<number>(0)
const searchForm = ref({
  current: 1,
  size: 10,
  firstLevelId: void 0,
  secondLevelId: void 0,
  thirdLevelId: void 0,
  growName: void 0,
  state: void 0,
})

onMounted(() => {
  initGrowth()
  fetchList()
})

//METHODS

const initGrowth = async () => {
  const { data: res } = await getGrowthTree()
  GROWTH_TREE.value = res
  FIRST_LEVEL.value = res
}

const fetchList = async () => {
  loading.value = true
  try {
    const { data } = await pageGrowAuditRecord(searchForm.value)
    total.value = data.total
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const passRow = (id: number) => {
  ElMessageBox.confirm('确认通过？', '通过该申请记录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'success',
  })
    .then(async () => {
      loading.value = true
      try {
        const data = await passGrowItem(id)
        ElMessage.success(data.message)
        fetchList()
      } catch {
        loading.value = false
      }
    })
    .catch(() => {})
}
const refuseRow = (id: number) => {
  ElMessageBox.prompt('请输入拒绝原因', '拒绝原因', {
    inputPlaceholder: '原因',
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputErrorMessage: '请输入原因',
  })
    .then(async ({ value }) => {
      loading.value = true
      try {
        const data = await refuseGrowItem(id, value)
        ElMessage.success(data.message)
        fetchList()
      } catch {
        loading.value = false
      }
    })
    .catch(() => {})
}
const returnRow = (id: number) => {
  ElMessageBox.prompt('请输入退回原因', '退回原因', {
    inputPlaceholder: '原因',
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputErrorMessage: '请输入原因',
  })
    .then(async ({ value }) => {
      loading.value = true
      try {
        const data = await returnGrowItem(id, value)
        ElMessage.success(data.message)
        fetchList()
      } catch {
        loading.value = false
      }
    })
    .catch(() => {})
}

const findChildrenById = (
  list: GrowthTreeVO[],
  id: number,
): GrowthTreeVO[] | [] => {
  for (const item of list) {
    if (item.id === id) {
      return item.children || []
    }
  }
  return []
}

const firstLevelChange = (val: number) => {
  searchForm.value.secondLevelId = undefined
  searchForm.value.thirdLevelId = undefined
  SECOND_LEVEL.value = findChildrenById(FIRST_LEVEL.value, val)
}

const secondLevelChange = (val: number) => {
  searchForm.value.thirdLevelId = undefined
  THIRD_LEVEL.value = findChildrenById(SECOND_LEVEL.value, val)
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  searchForm.value.size = val
  fetchList()
}
</script>
