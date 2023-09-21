<template>
  <div>
    <el-card>
      <template #header>
        <el-page-header icon="ArrowLeft" @click="router.back()">
          <template #content>我的积分申请</template>
        </el-page-header>
      </template>
      <el-row>
        <el-col :span="24">
          <el-form ref="searchRef" :model="search" label-width="100px">
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
                        search.l2Id = void 0
                        search.l3Id = void 0
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
                <el-form-item label="三级项目" prop="level3">
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
              <el-col :sm="24" :md="12" :xl="4">
                <el-form-item label="状态" prop="state">
                  <el-select v-model="search.state" class="w-full">
                    <el-option
                      v-for="item in AUDIT_STATUS.getDict()"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="12">
                <el-space>
                  <el-button
                    type="primary"
                    icon="Search"
                    :loading="loading"
                    plain
                    @click="fetchData"
                  >
                    查询
                  </el-button>
                  <el-button
                    icon="Close"
                    plain
                    @click="searchRef?.resetFields()"
                  >
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
                  <el-button type="primary" icon="Plus" plain @click="addRow">
                    申请成长积分
                  </el-button>
                </el-space>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
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
          prop="auditorName"
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
              type="primary"
              text
              bg
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.NO_PASS
              "
              @click="submitRow(row.id)"
            >
              提交
            </el-button>
            <el-button
              text
              bg
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.NO_PASS
              "
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              text
              bg
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.NO_PASS
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
      <Pagination @size-change="fetchData" @current-change="fetchData" />
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
            :options="studentApplyGrowthItems"
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
import { computed, onMounted, reactive, ref } from 'vue'
import type {
  FormInstance,
  FormRules,
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from 'element-plus'
import {
  type CascaderProps,
  ElMessage,
  ElMessageBox,
  genFileId,
} from 'element-plus'
import {
  applyGrowItem,
  deleteAudGrow,
  reqPageStudentApplyRecord,
  reqStudentGrowthItems,
  submitGrowItem,
  updateAudGrow,
} from '@/api/apply'
import { useRouter } from 'vue-router'
import { getToken } from '@/utils/auth'
import { requiredRule } from '@/utils/rules'
import { formatDate } from '@/utils/util'
import { AUDIT_STATUS } from '@/utils/dict'
import AuditDetails from '@/components/AuditDetails/index.vue'
import type { GrowApplyRecord, StudentGrowthItems } from '@/api/apply/type'
import useGrowthStore from '@/store/modules/growth'
import usePaginationStore from '@/store/modules/pagination'
import useDictionaryStore from '@/store/modules/dictionary'
import useUserStore from '@/store/modules/user'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

const baseApi = import.meta.env.VITE_APP_BASE_API
const action = baseApi + '/file/upload'

const cascadeProps: CascaderProps = {
  label: 'name',
  value: 'id',
  children: 'children',
  expandTrigger: 'hover',
  emitPath: false,
}

const growthStore = useGrowthStore()
const paginationStore = usePaginationStore()
const dictionaryStore = useDictionaryStore()
const userStore = useUserStore()
const router = useRouter()

const { yearId, semesterId } = userStore.otherInfo

const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const auditDetailsRef = ref()

const loading = ref<boolean>(false)
const active = ref<boolean>(false)
const title = ref<string>()
const tableData = ref()
const studentApplyGrowthItems = ref<TreeNode[]>([])

const search = ref<any>({
  yearId: void 0,
  semesterId: void 0,
  l1Id: void 0,
  l2Id: void 0,
  l3Id: void 0,
  growthItemName: void 0,
  state: void 0,
})
const form = ref<any>({
  id: void 0,
  growId: void 0,
  reason: void 0,
  fileIds: void 0,
})
const rules = reactive<FormRules>({
  growthItemId: [requiredRule('申请项目不能为空')],
  reason: [requiredRule('申请说明不能为空')],
  fileIds: [requiredRule('请上传证明附件')],
})

const headers = computed(() => {
  return {
    Authorization: getToken(),
  }
})

onMounted(async () => {
  await dictionaryStore.init()
  search.value.yearId = yearId
  search.value.semesterId = semesterId
  await fetchData()
  await growthStore.init()
  await initStudentApplyGrowthItems()
})

const initStudentApplyGrowthItems = async () => {
  const { data } = await reqStudentGrowthItems()
  studentApplyGrowthItems.value = buildTree(data)
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

const fetchData = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(search.value, { current, size })
    const { data } = await reqPageStudentApplyRecord(query)
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
const updateRow = (row: GrowApplyRecord) => {
  title.value = '修改申请'
  active.value = true
  form.value.id = row.id
  form.value.growId = row.growthItemId
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
        ElMessage.success(data.msg)
        await fetchData()
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
        ElMessage.success(data.msg)
        await fetchData()
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
      ElMessage.success(data.msg)
    }
    if (title.value === '修改申请') {
      const data = await updateAudGrow(form.value)
      ElMessage.success(data.msg)
    }
    await fetchData()
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
    reason: void 0,
    fileIds: void 0,
  }
  formRef.value?.resetFields()
  uploadRef.value?.clearFiles()
}
</script>

<style scoped lang="scss">
.el-card {
  margin: 10px;
}
</style>
