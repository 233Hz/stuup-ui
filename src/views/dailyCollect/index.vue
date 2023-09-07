<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <el-page-header icon="ArrowLeft" @back="router.back()">
          <template #content>
            <span class="text-large font-600 mr-3">学生日常采集</span>
          </template>
        </el-page-header>
      </template>
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
                style="width: 100%"
                @change="
                  (id: number) => {
                    growthStore.handleLevel1Change(id)
                    search.l2Id = void 0
                    search.l3Id = void 0
                  }
                "
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
                style="width: 100%"
                @change="
                  (id: number) => {
                    growthStore.handleLevel2Change(id)
                    search.l3Id = void 0
                  }
                "
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
              <el-input v-model.trim="search.growthItemName" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="审核状态" prop="state">
              <el-select v-model="search.state" style="width: 100%">
                <el-option
                  v-for="item in AUDIT_STATUS.getDict()"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="班级名称" prop="classId">
              <el-select v-model="search.classId" style="width: 100%">
                <el-option
                  v-for="item in dictionaryStore.class"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-space>
              <el-button
                type="primary"
                :loading="loading"
                plain
                @click="fetchData"
              >
                <el-icon>
                  <Search />
                </el-icon>
                查询
              </el-button>
              <el-button @click="searchRef?.resetFields()" plain>
                <el-icon>
                  <Close />
                </el-icon>
                清空
              </el-button>
              <el-button :loading="loading" plain @click="fetchData">
                <el-icon>
                  <Refresh />
                </el-icon>
                刷新
              </el-button>
              <el-button type="primary" @click="dialogRef.open()" plain>
                <el-icon>
                  <Upload />
                </el-icon>
                导入采集数据
              </el-button>
            </el-space>
          </el-col>
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
          prop="growthItemName"
          label="项目积分"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="applicantName"
          label="学生姓名"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="auditorName"
          label="班主任"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="className"
          label="班级名称"
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
            <el-button @click="auditDetailsRef.open(row)">审核信息</el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
            >
              提交
            </el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
            >
              修改
            </el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
              type="danger"
            >
              删除
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
      <div class="flex justify-end mt-12">
        <el-pagination
          background
          :total="total"
          v-model:current-page="search.current"
          v-model:page-size="search.size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="
            (size: number) => {
              search.size = size
              fetchData()
            }
          "
          @current-change="
            (current: number) => {
              search.current = current
              fetchData()
            }
          "
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>
    <upload-dialog ref="dialogRef" @upload-success="fetchData" />
    <audit-details ref="auditDetailsRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/util'
import { reqPageStudentUnionApplyRecord } from '@/api/apply'
import { AUDIT_STATUS } from '@/utils/dict'
import useDictionaryStore from '@/store/modules/dictionary'
import useGrowthStore from '@/store/modules/growth'
import useUserStore from '@/store/modules/user'
import UploadDialog from './UploadDialog.vue'
import AuditDetails from '@/components/AuditDetails/index.vue'

const router = useRouter()
const dictionaryStore = useDictionaryStore()
const growthStore = useGrowthStore()
const userStore = useUserStore()

const { yearId, semesterId } = userStore.userInfo

const dialogRef = ref()
const searchRef = ref()
const auditDetailsRef = ref()

const loading = ref(false)
const total = ref(0)
const search = ref<any>({
  current: 1,
  size: 10,
  yearId: void 0,
  semesterId: void 0,
  l1Id: void 0,
  l2Id: void 0,
  l3Id: void 0,
  growthItemName: void 0,
  state: void 0,
  classId: void 0,
})
const tableData = ref()

const fetchData = async () => {
  try {
    loading.value = true
    const { data } = await reqPageStudentUnionApplyRecord(search.value)
    total.value = data.total
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await dictionaryStore.init()
  search.value.yearId = yearId
  search.value.semesterId = semesterId
  await fetchData()
  await growthStore.init()
})
</script>

<style scoped lang="scss">
.el-card {
  margin: 10px;
}
</style>
