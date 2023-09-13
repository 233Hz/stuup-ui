<template>
  <div>
    <el-card shadow="never">
      <el-form ref="searchRef" :model="search">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="学年">
              <el-select v-model="search.yearId" style="width: 100%">
                <el-option
                  v-for="item in dictionaryStore.year"
                  :key="item.oid"
                  :label="item.value"
                  :value="item.oid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="学期">
              <el-select v-model="search.semesterId" style="width: 100%">
                <el-option
                  v-for="item in dictionaryStore.semester"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="一级项目" prop="l1Id">
              <el-select
                v-model="search.l1Id"
                @change="
                  (id: number) => {
                    growthStore.handleLevel1Change(id)
                    search.l1Id = void 0
                    search.l2Id = void 0
                  }
                "
                style="width: 100%"
              >
                <el-option
                  v-for="item in growthStore.level1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="二级项目" prop="l2Id">
              <el-select
                v-model="search.l2Id"
                @change="
                  (id: number) => {
                    growthStore.handleLevel2Change(id)
                    search.l3Id = void 0
                  }
                "
                style="width: 100%"
              >
                <el-option
                  v-for="item in growthStore.level2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="三级项目" prop="l3Id">
              <el-select v-model="search.l3Id" style="width: 100%">
                <el-option
                  v-for="item in growthStore.level3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="项目名称" prop="growthItemName">
              <el-input v-model="search.growthItemName" />
            </el-form-item>
          </el-col>
          <el-form-item>
            <el-space>
              <el-button
                type="primary"
                :loading="loading"
                plain
                icon="Search"
                @click="fetchData"
              >
                查询
              </el-button>
              <el-button plain icon="Close" @click="searchRef?.resetFields()">
                清空
              </el-button>
              <el-button
                :loading="loading"
                icon="Refresh"
                plain
                @click="fetchData"
              >
                刷新
              </el-button>
            </el-space>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        empty-text="空空如也~~"
        style="width: 100%"
      >
        <el-table-column
          prop="yearName"
          label="学年"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="semesterName"
          label="学期"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="growthItemName"
          label="项目名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="l3Name"
          label="三级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="l2Name"
          label="二级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="l1Name"
          label="一级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="applicantName"
          label="申请人"
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
            <el-tag v-show="row.state === AUDIT_STATUS.NO_PASS" type="danger">
              {{ AUDIT_STATUS.getKey('NO_PASS') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="growthItemScore"
          label="项目积分"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button text bg @click="auditDetailsRef.open(row)">
              审核信息
            </el-button>
            <el-button
              text
              bg
              type="success"
              :disabled="row.state !== AUDIT_STATUS.PENDING_REVIEW"
              @click="passRow(row.id)"
            >
              通过
            </el-button>
            <el-button
              text
              bg
              type="danger"
              :disabled="row.state !== AUDIT_STATUS.PENDING_REVIEW"
              @click="noPassRow(row.id)"
            >
              不通过
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
      </el-table>
      <Pagination @size-change="fetchData" @current-change="fetchData" />
    </el-card>
    <audit-details ref="auditDetailsRef" />
  </div>
</template>

<script setup lang="ts" name="Audit">
import { ref, onMounted } from 'vue'
import { reqPageStudentAudit, reqAuditPass, reqAuditNoPass } from '@/api/audit'
import { formatDate } from '@/utils/util'
import { ElMessage, ElMessageBox } from 'element-plus'
import { AUDIT_STATUS } from '@/utils/dict'
import type { FormInstance } from 'element-plus'
import useGrowthStore from '@/store/modules/growth'
import usePaginationStore from '@/store/modules/pagination'
import useDictionaryStore from '@/store/modules/dictionary'
import useUserStore from '@/store/modules/user'
import AuditDetails from '@/components/AuditDetails/index.vue'

const growthStore = useGrowthStore()
const paginationStore = usePaginationStore()
const dictionaryStore = useDictionaryStore()
const userStore = useUserStore()

const { yearId, semesterId } = userStore.userInfo

const searchRef = ref<FormInstance>()
const auditDetailsRef = ref()

const loading = ref<boolean>(false)
const tableData = ref()
const search = ref<any>({
  yearId: void 0,
  semesterId: void 0,
  l1Id: void 0,
  l2Id: void 0,
  l3Id: void 0,
  growthItemName: void 0,
})

onMounted(async () => {
  await fetchData({ yearId, semesterId })
  await growthStore.init()
  await dictionaryStore.init()
  search.value.yearId = yearId
  search.value.semesterId = semesterId
})

//METHODS

const fetchData = async (params?: any) => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(search.value, params, { current, size })
    const { data } = await reqPageStudentAudit(query)
    paginationStore.setTotal(data.total)
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
        const data = await reqAuditPass(id)
        ElMessage.success(data.message)
        await fetchData()
      } catch {
        loading.value = false
      }
    })
    .catch(() => {})
}
const noPassRow = (id: number) => {
  ElMessageBox.prompt('请输入不通过原因', '退回原因', {
    inputPlaceholder: '原因',
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputErrorMessage: '请输入原因',
    inputValidator: (value) => !!value,
  })
    .then(async ({ value }) => {
      loading.value = true
      try {
        const data = await reqAuditNoPass(id, value)
        ElMessage.success(data.message)
        await fetchData()
      } catch {
        loading.value = false
      }
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.el-card {
  margin: 10px;
}
</style>
