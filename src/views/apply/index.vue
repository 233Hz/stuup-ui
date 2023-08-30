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
            <el-button @click="auditDetailsRef.open(row)">审核信息</el-button>
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
          <el-cascader
            v-model="form.growId"
            placeholder="请选择所属项目"
            clearable
            :options="GROW_ITEM"
            :props="cascadeProps"
            style="width: 100%"
          />
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
        <el-form-item label="证明附件" prop="fileIds">
          <div style="width: 100%">
            <el-upload
              ref="uploadRef"
              drag
              accept=".jpg, .jpeg, .png"
              :limit="1"
              :action="action"
              :headers="headers"
              :disabled="loading"
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
                只支持.jpg, .jpeg, .png格式，且单个大小不超过1M,最多上传1个
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
    <audit-details ref="auditDetailsRef" />
  </div>
</template>

<script setup lang="ts" name="Apply">
import { ref, onMounted, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox, genFileId } from 'element-plus'
import {
  reqStudentGrowthItems,
  applyGrowItem,
  pageGrowApplyRecord,
  updateAudGrow,
  deleteAudGrow,
  submitGrowItem,
} from '@/api/apply'
import type { AudGrow } from '@/api/apply/type'
import { getToken } from '@/utils/auth'
import { AUDIT_STATUS } from '@/utils/dict'
import { requiredRule } from '@/utils/rules'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/util'
import AuditDetails from '@/components/AuditDetails/index.vue'
import useGrowthStore from '@/store/modules/growth'
import usePaginationStore from '@/store/modules/pagination'

import type {
  FormInstance,
  FormRules,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
  UploadFiles,
} from 'element-plus'
import type { StudentGrowthItems } from '@/api/apply/type'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

const baseApi = import.meta.env.VITE_APP_BASE_API
const action = baseApi + '/file/upload'

const cascadeProps = {
  label: 'name',
  value: 'id',
  children: 'children',
  expandTrigger: 'hover',
  emitPath: false,
}

const growthStore = useGrowthStore()
const paginationStore = usePaginationStore()
const router = useRouter()

//DICT
const GROW_ITEM = ref<TreeNode[]>()

//REF
const searchFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const auditDetailsRef = ref()

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
  fileIds: [requiredRule('证明附件')],
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
  const { data } = await reqStudentGrowthItems()
  GROW_ITEM.value = buildTree(data)
}

const buildTree = (data: StudentGrowthItems[]): TreeNode[] => {
  const tree: TreeNode[] = []

  for (const item of data) {
    const firstLevelId = item.firstLevelId
    const secondLevelId = item.secondLevelId
    const thirdLevelId = item.thirdLevelId
    const firstLevel = item.firstLevelName
    const secondLevel = item.secondLevelName
    const thirdLevel = item.thirdLevelName
    const id = item.id
    const name = item.name

    let firstLevelNode = tree.find((node) => node.id === firstLevelId)
    if (!firstLevelNode) {
      firstLevelNode = { id: firstLevelId, name: firstLevel, children: [] }
      tree.push(firstLevelNode)
    }

    let secondLevelNode: TreeNode | undefined
    if (secondLevel) {
      secondLevelNode = firstLevelNode.children?.find(
        (node) => node.id === secondLevelId,
      )
      if (!secondLevelNode) {
        secondLevelNode = { id: secondLevelId, name: secondLevel, children: [] }
        firstLevelNode.children?.push(secondLevelNode)
      }
    } else {
      secondLevelNode = firstLevelNode
    }

    let thirdLevelNode: TreeNode | undefined
    if (thirdLevel) {
      thirdLevelNode = secondLevelNode.children?.find(
        (node) => node.id === thirdLevelId,
      )
      if (!thirdLevelNode) {
        thirdLevelNode = { id: thirdLevelId, name: thirdLevel, children: [] }
        secondLevelNode.children?.push(thirdLevelNode)
      }
    } else {
      thirdLevelNode = secondLevelNode
    }

    thirdLevelNode.children?.push({ id, name })
  }

  return tree
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

const handleUploadRemove: UploadProps['onRemove'] = () => {
  form.value.fileIds = void 0
}
const handleUploadSuccess: UploadProps['onSuccess'] = (response) => {
  form.value.fileIds = response.data.id
}

const handleFileChange = (file: UploadFile, fileList: UploadFiles) => {
  if (!file) return
  const size = file.size! / 1024 / 1024
  if (size > 1) {
    const currIdx = fileList.indexOf(file)
    fileList.splice(currIdx, 1)
    ElMessage.warning('上传文件大小不能超过 1MB!')
    return
  }
}
const handleExceed: UploadProps['onExceed'] = (files, fileList) => {
  ElMessageBox.confirm('上传文件超出上限，是否覆盖', '警告', {
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    type: 'warning',
  })
    .then(() => {
      uploadRef.value!.clearFiles()
      const file = files[0] as UploadRawFile
      file.uid = genFileId()
      uploadRef.value!.handleStart(file)
      // const length = files.length
      // for (let i = 0; i < length; i++) {
      //   const file = files[i] as UploadRawFile
      //   const size = file.size! / 1024 / 1024
      //   if (size > 1) {
      //     ElMessage.warning('上传文件大小不能超过 1MB!')
      //     return
      //   }
      //   file.uid = genFileId()
      //   if (fileList.length >= 1) {
      //     fileList.shift()
      //   }
      //   fileList.push(file)
      // }
      ElMessage({
        type: 'success',
        message: '覆盖成功',
      })
    })
    .catch(() => {})
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
