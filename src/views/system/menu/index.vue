<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <!-- <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="权限名称" prop="name">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入权限名称"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="权限编号" prop="code">
              <el-input
                v-model="searchForm.code"
                placeholder="请输入权限编号"
              />
            </el-form-item>
          </el-col> -->
          <el-col :sm="24" :md="12" :xl="4">
            <el-space>
              <!-- <el-button
                type="primary"
                icon="Search"
                plain
                :loading="loading"
                @click="fetchData"
              >
                查询
              </el-button>
              <el-button icon="Close" plain @click="searchRef?.resetFields()">
                清空
              </el-button> -->
              <el-button
                type="primary"
                icon="Plus"
                plain
                v-permission="'menu_add'"
                @click="formRef.open()"
              >
                添加
              </el-button>
            </el-space>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        stripe
        row-key="id"
        :indent="30"
        v-loading="loading"
        icon
        empty-text="空空如也~~"
        default-expand-all
        style="width: 100%"
      >
        <el-table-column prop="name" label="权限名称" show-overflow-tooltip />
        <el-table-column prop="code" label="权限编号" show-overflow-tooltip />
        <el-table-column prop="path" label="菜单路径" show-overflow-tooltip />
        <el-table-column
          prop="permission"
          label="权限标识"
          show-overflow-tooltip
        />
        <el-table-column prop="icon" label="菜单图标" show-overflow-tooltip />
        <el-table-column prop="type" label="权限类型" align="center">
          <template #default="{ row: { type } }">
            <el-tag effect="dark" v-if="type === 0">菜单</el-tag>
            <el-tag type="success" effect="dark" v-if="type === 1">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="flag" label="菜单标识" align="center">
          <template #default="{ row: { flag } }">
            <el-tag effect="dark" v-if="flag === 1">前台菜单</el-tag>
            <el-tag type="success" effect="dark" v-if="flag === 2">
              后台菜单
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="keepAlive" label="缓存页面" align="center">
          <template #default="{ row: { keepAlive } }">
            <el-tag type="success" effect="dark" v-if="keepAlive === 1">
              缓存
            </el-tag>
            <el-tag type="info" effect="dark" v-if="keepAlive === 2">
              不缓存
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="layout" label="布局类型" align="center">
          <template #default="{ row: { layout } }">
            <el-tag effect="dark" v-if="layout === 1">后台布局</el-tag>
            <el-tag type="warning" effect="dark" v-if="layout === 2">无</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="显示菜单" align="center">
          <template #default="{ row: { hidden } }">
            <el-tag effect="danger" v-if="hidden === 1">不显示</el-tag>
            <el-tag type="success" effect="dark" v-if="hidden === 2">
              显示
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="redirect"
          label="重定向路径"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button
              text
              bg
              icon="Plus"
              v-permission="'menu_add'"
              @click="addRow(row.id)"
            >
              添加
            </el-button>
            <el-button
              text
              bg
              icon="Edit"
              v-permission="'menu_edit'"
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              text
              bg
              type="danger"
              icon="Delete"
              v-permission="'menu_del'"
              @click="delRow(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Form ref="formRef" :menu-tree="menuSelectTree" @refresh="fetchData" />
  </div>
</template>

<script setup lang="ts" name="Menu">
import { ref, onMounted, computed } from 'vue'
import { reqMenuTreeList, reqDelMenu } from '@/api/system/menu/index'
import { convertTree } from '@/utils/util'
import Form, { menuSelectTree } from './form.vue'
import type { FormInstance } from 'element-plus'
import type { MenuTree } from '@/api/system/menu/type'
import { ElMessage, ElMessageBox } from 'element-plus'

onMounted(async () => {
  await fetchData()
})

let menuTreeSource: readonly MenuTree[]

const searchRef = ref<FormInstance>()
const formRef = ref()

const loading = ref(false)
const tableData = ref()
const searchForm = ref({
  pid: void 0,
  name: void 0,
  code: void 0,
})

const menuSelectTree = computed(() => {
  if (tableData.value) {
    return [
      {
        id: 0,
        label: '根菜单',
        children: convertTree<MenuTree, menuSelectTree>(
          tableData.value,
          (item) => ({
            id: item.id,
            label: item.name,
          }),
        ),
      },
    ]
  } else {
    return [
      {
        id: 0,
        label: '根菜单',
        children: [],
      },
    ]
  }
})

const fetchData = async () => {
  loading.value = true
  try {
    const { data: res } = await reqMenuTreeList()
    menuTreeSource = Object.freeze(res)
    tableData.value = menuTreeSource
  } finally {
    loading.value = false
  }
}
const addRow = (id: number) => {
  formRef.value.open({ pid: id })
}
const updateRow = (row: any) => {
  formRef.value.open(row)
}
const delRow = (id: number) => {
  ElMessageBox.confirm('确认删除？', 'Warning', {
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    type: 'warning',
  })
    .then(async () => {
      try {
        loading.value = true
        const res = await reqDelMenu(id)
        ElMessage.success(res.msg)
        fetchData()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
