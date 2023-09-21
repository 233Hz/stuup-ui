<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="30%"
    draggable
    @close="resetForm"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="loading"
      label-position="top"
    >
      <el-form-item label="父菜单" prop="pid">
        <el-tree-select
          v-model="form.pid"
          check-strictly
          node-key="id"
          :data="menuTree"
          :render-after-expand="true"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="权限编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入菜单编号" />
      </el-form-item>
      <el-form-item label="权限类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="0" border>菜单</el-radio>
          <el-radio :label="1" border>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单路径" prop="path" v-show="form.type === 0">
        <el-input v-model="form.path" placeholder="请输入菜单路径" />
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon" v-show="form.type === 0">
        <el-input v-model="form.icon" placeholder="请输入菜单图标" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单标识" prop="flag" v-show="form.type === 0">
            <el-radio-group v-model="form.flag">
              <el-radio :label="1" border>前台菜单</el-radio>
              <el-radio :label="2" border>后台菜单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="缓存页面"
            prop="keepAlive"
            v-show="form.type === 0"
          >
            <el-radio-group v-model="form.keepAlive">
              <el-radio :label="1" border>缓存</el-radio>
              <el-radio :label="2" border>不缓存</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="布局类型" prop="layout" v-show="form.type === 0">
            <el-radio-group v-model="form.layout">
              <el-radio :label="1" border>无</el-radio>
              <el-radio :label="2" border>后台布局</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="隐藏菜单" prop="hidden" v-show="form.type === 0">
            <el-radio-group v-model="form.hidden">
              <el-radio :label="1" border>隐藏</el-radio>
              <el-radio :label="2" border>显示</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="权限标识" prop="permission" v-show="form.type === 1">
        <el-input v-model="form.permission" placeholder="请输入权限标识" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          style="width: 100%"
          v-model="form.sort"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="Close" :disabled="loading" @click="show = false">
        取消
      </el-button>
      <el-button
        type="primary"
        icon="Check"
        :disabled="loading"
        :loading="loading"
        @click="submit"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { requiredRule } from '@/utils/rules'
import { reqAddMenu, reqUpdateMenu } from '@/api/system/menu'
import { ElMessage } from 'element-plus'
import { Menu } from '@/api/login/type'

export interface menuSelectTree {
  id: number
  label: string
  children?: menuSelectTree[]
}

const { menuTree } = defineProps<{
  menuTree: menuSelectTree[]
}>()

let rules = ref<any>({
  pid: [requiredRule('父节点不能为空')],
  name: [requiredRule('权限名称不能为空')],
  code: [requiredRule('权限编号不能为空')],
  type: [requiredRule('权限类型不能为空')],
  sort: [requiredRule('排序不能为空')],
  path: [],
  permission: [],
})

const formRef = ref()

const show = ref(false)
const loading = ref(false)

const form = ref<any>({
  id: void 0,
  pid: void 0,
  name: void 0,
  code: void 0,
  type: 0,
  path: void 0,
  icon: void 0,
  flag: void 0,
  sort: 1,
  keepAlive: void 0,
  permission: void 0,
  layout: void 0,
  hidden: void 0,
  redirect: void 0,
})

watch(
  () => form.value.type,
  (newType) => {
    if (newType === 0) {
      form.value.permission = void 0
      form.value.flag = 1
      form.value.keepAlive = 2
      form.value.layout = 1
      form.value.hidden = 2
      rules.value.permission.pop()
      rules.value.path.push(requiredRule('菜单路径不能为空'))
    } else if (newType === 1) {
      form.value.path = void 0
      form.value.icon = void 0
      form.value.flag = void 0
      form.value.keepAlive = void 0
      form.value.layout = void 0
      form.value.hidden = void 0
      rules.value.path.pop()
      rules.value.permission.push(requiredRule('权限标识不能为空'))
    }
  },
  {
    immediate: true,
  },
)

const title = computed(() => (form.value.id ? '修改菜单' : '添加菜单'))

const open = (data?: any) => {
  data && (form.value = Object.assign(form.value, data))
  show.value = true
}

const submit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        loading.value = true
        const res = form.value.id
          ? await reqUpdateMenu(form.value)
          : await reqAddMenu(form.value)
        ElMessage.success(res.msg)
        emit('refresh', res.data)
        show.value = false
      } finally {
        loading.value = false
      }
    }
  })
}

const resetForm = () => {
  form.value = {
    id: void 0,
    pid: void 0,
    name: void 0,
    code: void 0,
    type: 0,
    path: void 0,
    icon: void 0,
    flag: 1,
    sort: 1,
    keepAlive: 2,
    permission: void 0,
    layout: 1,
    hidden: 2,
    redirect: void 0,
  }
  formRef.value?.resetFields()
}

const emit = defineEmits<{
  (e: 'refresh', menu: Menu): void
}>()
defineExpose({ open })
</script>
