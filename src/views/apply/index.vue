<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-page-header :icon="ArrowLeft" @click="router.back()">
          <template #content>我的积分申请</template>
        </el-page-header>
      </template>
      <el-row>
        <el-col :span="24">
          <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
            <el-row>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="一级项目" prop="firstLevelId">
                  <el-select
                    v-model="searchForm.firstLevelId"
                    @change="
                      (id: number) => {
                        growthStore.handleLevel1Change(id)
                        searchForm.secondLevelId = void 0
                        searchForm.thirdLevelId = void 0
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
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="二级项目" prop="secondLevelId">
                  <el-select
                    v-model="searchForm.secondLevelId"
                    @change="
                      (id: number) => {
                        growthStore.handleLevel2Change(id)
                        searchForm.thirdLevelId = void 0
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
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="三级项目" prop="thirdLevelId">
                  <el-select
                    v-model="searchForm.thirdLevelId"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in growthStore.level3"
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
                  <el-select v-model="searchForm.state" class="w-full">
                    <el-option
                      v-for="item in AUDIT_STATUS.getDict()"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item>
                  <el-space>
                    <el-button
                      type="primary"
                      @click="fetchList"
                      :loading="loading"
                    >
                      <el-icon><Search /></el-icon>
                      查询
                    </el-button>
                    <el-button @click="searchFormRef?.resetFields()">
                      <el-icon><Close /></el-icon>
                      清空
                    </el-button>
                  </el-space>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template #header>
        <el-space>
          <el-button type="primary" @click="addRow">
            <el-icon><Plus /></el-icon>
            申请成长积分
          </el-button>
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
          prop="growName"
          label="项目名称"
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
          prop="secondLevelName"
          label="二级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="firstLevelName"
          label="一级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="auditor"
          label="审核人"
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
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button @click="auditInfoRef.open(row)">审核信息</el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
              @click="submitRow(row.id)"
            >
              提交
            </el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
              type="danger"
              @click="delRow(row.id)"
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
      <Pagination @size-change="fetchList" @current-change="fetchList" />
    </el-card>
    <el-dialog
      v-model="active"
      :title="title"
      width="800"
      draggable
      @close="resetForm"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="申请项目" prop="growId">
          <el-select
            v-model="form.growId"
            placeholder="请选择申请项目"
            style="width: 100%"
            :disabled="title === '修改申请'"
            clearable
          >
            <el-option
              v-for="item in GROW_ITEM"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left">{{ item.name }}</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
              >
                {{ item.desc }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请说明" prop="reason">
          <el-input
            v-model="form.reason"
            placeholder="请输入申请说明"
            type="textarea"
            maxlength="200"
            :rows="4"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="证明附件" prop="fileId">
          <div style="width: 100%">
            <el-upload
              ref="uploadRef"
              drag
              multiple
              accept=".jpg, .jpeg, .png"
              :limit="5"
              :action="action"
              :headers="headers"
              :disabled="loading"
              :auto-upload="false"
              :on-change="handleFileChange"
              :on-exceed="handleExceed"
              :on-remove="handleUploadRemove"
              :on-success="handleUploadSuccess"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <template #tip>
                只支持.jpg, .jpeg, .png格式，且单个大小不超过1M,最多上传5个
              </template>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="active = false">
          <el-icon><Close /></el-icon>
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">
          <el-icon><Check /></el-icon>
          提交
        </el-button>
      </template>
    </el-dialog>
    <AuditInfo ref="auditInfoRef" />
  </div>
</template>

<script setup lang="ts" name="Apply">
import { ref, onMounted, reactive, computed } from 'vue'
import type {
  FormInstance,
  FormRules,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
  UploadFiles,
} from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getStudentGrowthItems,
  applyGrowItem,
  pageGrowApplyRecord,
  updateAudGrow,
  deleteAudGrow,
  submitGrowItem,
} from '@/api/apply'
import type { AudGrow } from '@/api/apply/type'
import type { ResponseData } from '@/types/global'
import type { FileVO } from '@/api/file/type'
import { getToken } from '@/utils/auth'
import { AUDIT_STATUS } from '@/utils/dict'
import { requiredRule } from '@/utils/rules'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/util'
import AuditInfo from '@/components/AuditInfo/index.vue'
import useGrowthStore from '@/store/modules/growth'
import usePaginationStore from '@/store/modules/pagination'

const baseApi = import.meta.env.VITE_APP_BASE_API
const action = baseApi + '/file/upload'

const growthStore = useGrowthStore()
const paginationStore = usePaginationStore()
const router = useRouter()

//DICT
const GROW_ITEM = ref()

//REF
const searchFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const auditInfoRef = ref()

//DATA
const loading = ref<boolean>(false)
const active = ref<boolean>(false)
const title = ref<string>()
const tableData = ref()

const searchForm = ref({
  firstLevelId: void 0,
  secondLevelId: void 0,
  thirdLevelId: void 0,
  growName: void 0,
  state: void 0,
})
const form = ref<any>({
  id: void 0,
  growId: void 0,
  reason: void 0,
  fileIds: void 0,
})
const rules = reactive<FormRules>({
  growId: [requiredRule('申请项目')],
  reason: [requiredRule('申请说明')],
})

//INIT
onMounted(async () => {
  fetchList()
  initGrowthItem()
  // 初始化成长项目仓库数据
  await growthStore.init()
})

//COMPUTED
const headers = computed(() => {
  return {
    Authorization: getToken(),
  }
})

//WATCH

//METHODS
const initGrowthItem = async () => {
  const { data } = await getStudentGrowthItems()
  GROW_ITEM.value = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      desc: `${item.firstLevelName ? item.firstLevelName : '无'} | ${
        item.secondLevelName ? item.secondLevelName : '无'
      } | ${item.thirdLevelName ? item.thirdLevelName : '无'}`,
    }
  })
}

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data } = await pageGrowApplyRecord(query)
    paginationStore.setTotal(data.total)
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const addRow = () => {
  title.value = '申请成长积分'
  active.value = true
}
const updateRow = (row: AudGrow) => {
  title.value = '修改申请'
  active.value = true
  form.value.id = row.id
  form.value.growId = row.growId
  form.value.reason = row.reason
  form.value.fileIds = row.fileIds
}
const delRow = (id: number) => {
  ElMessageBox.confirm('确认删除？', '删除该申请记录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'error',
  })
    .then(async () => {
      loading.value = true
      try {
        const data = await deleteAudGrow(id)
        ElMessage.success(data.message)
        fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const submitRow = (id: number) => {
  ElMessageBox.confirm('确认提交？', '提交该申请记录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        const data = await submitGrowItem(id)
        ElMessage.success(data.message)
        fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const submitForm = async () => {
  if (!formRef) return
  const valid = await formRef.value?.validate()
  if (!valid) return
  loading.value = true
  try {
    if (title.value === '申请成长积分') {
      const data = await applyGrowItem(form.value)
      ElMessage.success(data.message)
    }
    if (title.value === '修改申请') {
      const data = await updateAudGrow(form.value)
      ElMessage.success(data.message)
    }
    fetchList()
    active.value = false
  } finally {
    loading.value = false
  }
}

const handleUploadRemove: UploadProps['onRemove'] = (
  uploadFile,
  uploadFiles,
) => {
  const ids = uploadFiles
    .map((item) => (item.response as ResponseData<FileVO>).data.id)
    .join(',')
  form.value.fileIds = ids
}
const handleUploadSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
  uploadFiles,
) => {
  const ids = uploadFiles
    .map((item) => (item.response as ResponseData<FileVO>).data.id)
    .join(',')
  form.value.fileIds = ids
}

const handleFileChange = (file: UploadFile, fileList: UploadFiles) => {
  console.log(file, fileList)
  if (!file) return
  const size = file.size! / 1024 / 1024
  if (size > 1) {
    const currIdx = fileList.indexOf(file)
    fileList.splice(currIdx, 1)
    ElMessage.warning('上传文件大小不能超过 3MB!')
  }
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  console.log(files)
}

const resetForm = () => {
  form.value = {
    id: void 0,
    growId: void 0,
    reason: '',
    fileIds: '',
  }
  formRef.value?.resetFields()
  uploadRef.value?.clearFiles()
}
</script>
