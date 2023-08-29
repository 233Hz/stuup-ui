<template>
  <el-drawer
    v-model="active"
    title="设置项目负责人"
    direction="rtl"
    size="60%"
    @close="drawerCloseHandle"
  >
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="fs-14">项目负责人</span>
          <el-button size="small" @click="emptySelectHandler">清空</el-button>
        </div>
      </template>
      <el-tag
        v-if="hasUserTags"
        v-for="user in userTags"
        :key="user.id"
        class="m-2"
        closable
        :disable-transitions="false"
        @close="removeUsersHandler(user.id)"
      >
        {{ user.name }}
      </el-tag>
      <el-empty v-else class="h-200" description="还未设置项目负责人" />
    </el-card>
    <el-row :gutter="20" v-loading="loading" class="mt-20">
      <el-col :span="12">
        <teacher-select
          ref="teacherSelectRef"
          @select-change="teacherSelectChangeHandler"
        />
      </el-col>
      <el-col :span="12">
        <student-select
          ref="studentSelectRef"
          @select-change="studentSelectChangeHandler"
        />
      </el-col>
    </el-row>
    <template #footer>
      <el-space>
        <el-button @click="active = false">关闭</el-button>
        <el-button type="primary" :loading="loading" @click="setGrowUser">
          提交
        </el-button>
      </el-space>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getGrowItemUser, setGrowthItemUser } from '@/api/grow/config'
import { ElMessage } from 'element-plus'
import { ASSIGN_TYPE } from '@/utils/dict'
import type { SimpleUserVO } from '@/api/system/user/type'
import TeacherSelect from './TeacherSelect.vue'
import StudentSelect from './StudentSelect.vue'

interface UserTag {
  id: number
  name: string
}

const teacherSelectRef = ref()
const studentSelectRef = ref()
const active = ref<boolean>(false)
const loading = ref<boolean>(false)
const growthItemId = ref()
const assignType = ref()
const userTags = ref<UserTag[]>()

/**
 * 抽屉打开事件
 * @param id 当前项目id
 */
const open = (id: number, assign?: number) => {
  active.value = true
  growthItemId.value = id
  assignType.value = assign
  getGrowUser(id)
}

/**
 * 获取该项的项目负责人
 * @param id
 */
const getGrowUser = async (id: number) => {
  if (assignType.value) {
    loading.value = true
    try {
      const { data } = await getGrowItemUser(id)
      userTags.value = data.map((item) => ({
        id: item.id,
        name: item.username,
      }))
    } finally {
      loading.value = false
    }
  }
}

/**
 * 设置项目负责人
 */
const setGrowUser = async () => {
  loading.value = true
  if (userTags.value?.length === 0) ElMessage.error('请选择项目负责人')
  const userId = userTags.value?.map((item) => item.id)
  try {
    await setGrowthItemUser(growthItemId.value, userId!)
    active.value = false
    ElMessage.success('设置成功')
  } finally {
    loading.value = false
  }
}

/**
 * 移除项目负责人
 */
const removeUsersHandler = (userId: number) => {
  userTags.value = userTags.value?.filter((item) => item.id !== userId)
  if (assignType.value === ASSIGN_TYPE.TEACHER)
    teacherSelectRef.value?.cancelSelect(userId)
  else if (assignType.value === ASSIGN_TYPE.STUDENT)
    studentSelectRef.value?.cancelSelect(userId)
}

/**
 * 清空项目负责人
 */
const emptySelectHandler = () => {
  if (userTags.value && userTags.value.length > 0) {
    if (assignType.value === ASSIGN_TYPE.TEACHER) {
      userTags.value.forEach((item) => {
        teacherSelectRef.value?.cancelSelect(item.id)
      })
    } else if (assignType.value === ASSIGN_TYPE.STUDENT) {
      userTags.value.forEach((item) => {
        studentSelectRef.value?.cancelSelect(item.id)
      })
    }
    userTags.value = []
  }
}

/**
 * 是否选择了项目负责人
 */
const hasUserTags = computed(
  () => userTags.value && userTags.value?.length !== 0,
)

/**
 * 抽屉关闭处理
 */
const drawerCloseHandle = () => {
  teacherSelectRef.value?.reset()
  studentSelectRef.value?.reset()
}

/**
 * 选择老师改变处理
 * @param users
 */
const teacherSelectChangeHandler = (users: SimpleUserVO[]) => {
  if (users.length !== 0) studentSelectRef.value?.clearSelection()
  userTags.value = users.map((item) => ({ id: item.id, name: item.username }))
  assignType.value = ASSIGN_TYPE.TEACHER
}

/**
 * 选择学生改变处理
 * @param users
 */
const studentSelectChangeHandler = (users: SimpleUserVO[]) => {
  if (users.length !== 0) teacherSelectRef.value?.clearSelection()
  userTags.value = users.map((item) => ({ id: item.id, name: item.username }))
  assignType.value = ASSIGN_TYPE.STUDENT
}

defineExpose({ open })
</script>
