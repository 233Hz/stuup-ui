<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="通知标题" prop="title">
                    <el-input v-model="searchForm.title" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="发布状态" prop="state">
                    <el-select v-model="searchForm.state" class="w-full">
                      <el-option
                        v-for="item in ANNOUNCEMENT_STATE.getDict()"
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
          <el-button type="primary" @click="addRow">
            <el-icon><Plus /></el-icon>
            发布公告
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
          prop="title"
          label="公告标题"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="发布时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="createUser"
          label="发布人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column label="发布状态" show-overflow-tooltip align="center">
          <template #default="{ row }">
            {{ ANNOUNCEMENT_STATE.getKeyForValue(row.state) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button @click="perviewRow(row.id)">预览</el-button>
            <el-button
              :disabled="row.state === ANNOUNCEMENT_STATE.PUBLISHED"
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              type="warning"
              @click="publishRow(row.id, row.title)"
              v-show="row.state === ANNOUNCEMENT_STATE.PUBLISHED"
            >
              撤回
            </el-button>
            <el-button
              type="success"
              @click="publishRow(row.id, row.title)"
              v-show="row.state === ANNOUNCEMENT_STATE.UNPUBLISHED"
            >
              发布
            </el-button>
            <el-button
              :disabled="row.state === ANNOUNCEMENT_STATE.PUBLISHED"
              @click="delRow(row.id, row.title)"
              type="danger"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-r">
        <el-pagination
          background
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
  </div>
  <el-dialog
    v-model="active"
    :title="title"
    width="50%"
    draggable
    @close="resetForm"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="disabled"
      label-position="top"
    >
      <el-form-item label="通知标题" prop="title">
        <el-input v-model="form.title" maxlength="30" show-word-limit />
      </el-form-item>
      <el-form-item label="通知范围" prop="scope">
        <el-radio-group v-model="form.scope">
          <el-radio
            v-for="item in ANNOUNCEMENT_SCOPE.getDict()"
            :label="item.value"
            border
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="通知内容" prop="content">
        <div style="border: 1px solid #ccc; width: 100%">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            mode="default"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="form.content"
            :defaultConfig="{ placeholder: '请输入内容...', maxLength: 4000 }"
            mode="default"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-space v-show="title != '查看'">
        <el-button @click="active = false">
          <el-icon><Close /></el-icon>
          取 消
        </el-button>
        <el-button type="primary" :loading="loading" @click="submitForm(false)">
          <el-icon><Check /></el-icon>
          保 存
        </el-button>
        <el-button type="success" :loading="loading" @click="submitForm(true)">
          <el-icon><Check /></el-icon>
          保存并发布
        </el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="Notify">
import {
  ref,
  onMounted,
  reactive,
  shallowRef,
  onBeforeUnmount,
  h,
  nextTick,
} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ANNOUNCEMENT_SCOPE, ANNOUNCEMENT_STATE } from '@/utils/dict'
import { requiredRule } from '@/utils/rules'
import {
  reqNotifyPage,
  saveOrUpdateNotify,
  delNotify,
  publishNotify,
} from '@/api/system/announcement/index'
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * ==================== Ref ====================
 */
const editorRef = shallowRef()
const searchFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

/**
 * ==================== Data ====================
 */
const loading = ref<boolean>(false)
const disabled = ref<boolean>(false)
const active = ref<boolean>(false)
const title = ref<string>('')
const total = ref<number>(0)
const tableData = ref()
const searchForm = ref({
  current: 1,
  size: 10,
  title: void 0,
  type: void 0,
  state: void 0,
})
const form = ref<any>({
  id: void 0,
  title: void 0,
  scope: void 0,
  content: void 0,
})
const rules = reactive<FormRules>({
  title: [requiredRule('公告标题')],
  scope: [requiredRule('请选择公告范围')],
  userIds: [],
})

/**
 * ==================== 生命周期 ====================
 */

onMounted(() => {
  fetchList()
})

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

/**
 * ==================== 方法 ====================
 */

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const fetchList = async () => {
  loading.value = true
  try {
    const { data } = await reqNotifyPage(searchForm.value)
    total.value = data.total
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const perviewRow = (id: number) => {
  title.value = '查看'
  active.value = true
  router.push('/article/' + id)
}

const addRow = () => {
  title.value = '添加'
  active.value = true
}
const updateRow = (row) => {
  title.value = '修改'
  active.value = true
  nextTick(() => {
    form.value.id = row.id
    form.value.title = row.title
    form.value.scope = row.scope
    form.value.userIds = row.userIds
    form.value.content = row.content || ''
  })
}
const delRow = (id: number, title: string) => {
  ElMessageBox({
    title: '删除公告',
    message: h('p', null, [
      h('span', null, '确认删除该公告：'),
      h('strong', { style: 'color: #409EFF; font-size: 18px' }, title),
    ]),
    showCancelButton: true,
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
  })
    .then(async () => {
      loading.value = true
      try {
        const res = await delNotify(id)
        ElMessage.success(res.message)
        fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const publishRow = (id: number, title: string) => {
  ElMessageBox({
    title: '发布/撤回 公告',
    message: h('p', null, [
      h('span', null, '确认 发布/撤回 该公告：'),
      h('strong', { style: 'color: #409EFF; font-size: 18px' }, title),
    ]),
    showCancelButton: true,
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
  })
    .then(async () => {
      loading.value = true
      try {
        const res = await publishNotify(id)
        ElMessage.success(res.message)
        fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const submitForm = async (publish: boolean) => {
  if (!formRef) return
  const valid = await formRef.value?.validate()
  if (!valid) return
  loading.value = true
  try {
    const res = await saveOrUpdateNotify(Object.assign({ publish }, form.value))
    ElMessage.success(res.message)
    active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  searchForm.value.size = val
  fetchList()
}

const resetForm = () => {
  form.value = {
    id: void 0,
    title: void 0,
    scope: void 0,
    content: void 0,
  }
  formRef.value?.resetFields()
  disabled.value = false
  editorRef.value.enable()
  editorRef.value.unFullScreen()
}
</script>
