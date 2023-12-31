<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="通知标题" prop="title">
              <el-input v-model="searchForm.title" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
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
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item>
              <el-space>
                <el-button
                  type="primary"
                  icon="Search"
                  plain
                  :loading="loading"
                  @click="fetchList"
                >
                  查询
                </el-button>
                <el-button icon="Close" plain @click="searchRef?.resetFields()">
                  清空
                </el-button>
                <el-button
                  type="primary"
                  icon="Plus"
                  plain
                  v-permission="'notice_publish_edit'"
                  @click="addRow"
                >
                  发布公告
                </el-button>
                <el-button
                  icon="Refresh"
                  plain
                  circle
                  :disabled="loading"
                  @click="fetchList"
                />
              </el-space>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <el-space></el-space>
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
            <el-button bg text icon="View" @click="previewRow(row.id)">
              预览
            </el-button>
            <el-button
              bg
              text
              v-permission="'notice_publish_edit'"
              :disabled="row.state === ANNOUNCEMENT_STATE.PUBLISHED"
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              bg
              text
              type="warning"
              v-permission="'notice_publish_edit'"
              v-show="row.state === ANNOUNCEMENT_STATE.PUBLISHED"
              @click="publishRow(row.id, row.title)"
            >
              撤回
            </el-button>
            <el-button
              bg
              text
              type="success"
              v-permission="'notice_publish_edit'"
              v-show="row.state === ANNOUNCEMENT_STATE.UNPUBLISHED"
              @click="publishRow(row.id, row.title)"
            >
              发布
            </el-button>
            <el-button
              bg
              text
              type="danger"
              v-permission="'notice_del'"
              :disabled="row.state === ANNOUNCEMENT_STATE.PUBLISHED"
              @click="delRow(row.id, row.title)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination @size-change="fetchList" @current-change="fetchList" />
    </el-card>
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
            <el-icon>
              <Close />
            </el-icon>
            取 消
          </el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm(false)"
          >
            <el-icon>
              <Check />
            </el-icon>
            保 存
          </el-button>
          <el-button
            type="success"
            :loading="loading"
            @click="submitForm(true)"
          >
            <el-icon>
              <Check />
            </el-icon>
            保存并发布
          </el-button>
        </el-space>
      </template>
    </el-dialog>
  </div>
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
import usePaginationStore from '@/store/modules/pagination'

const router = useRouter()
const paginationStore = usePaginationStore()

/**
 * ==================== Ref ====================
 */
const editorRef = shallowRef()
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

/**
 * ==================== Data ====================
 */
const loading = ref<boolean>(false)
const disabled = ref<boolean>(false)
const active = ref<boolean>(false)
const title = ref<string>('')
const tableData = ref()
const searchForm = ref({
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
  title: [requiredRule('公告标题不能为空')],
  scope: [requiredRule('公告范围不能为空')],
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
//@ts-ignore
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data } = await reqNotifyPage(query)
    paginationStore.setTotal(data.total)
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const previewRow = (id: number) => {
  title.value = '查看'
  active.value = true
  router.push('/article/' + id)
}

const addRow = () => {
  title.value = '添加'
  active.value = true
}

//@ts-ignore
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
        ElMessage.success(res.msg)
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
        ElMessage.success(res.msg)
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
    ElMessage.success(res.msg)
    active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
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

<style scoped>
.el-card {
  margin: 10px;
}
</style>
