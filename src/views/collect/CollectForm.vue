<template>
  <el-dialog
    v-model="active"
    title="导入成长项目"
    width="40%"
    center
    @close="handleClose"
  >
    <el-form
      ref="fromRef"
      :model="form"
      :disabled="loading"
      label-position="top"
    >
      <el-form-item label="成长项目" prop="rec_code">
        <el-radio-group v-model="form.recCode">
          <el-radio
            v-for="item in coverApplyGrowthItem"
            :key="item.id"
            :label="item.code"
            border
            style="margin: 5px"
          >
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <UploadExcel
          ref="uploadExcelRef"
          :url="action"
          :data="form"
          :disabled="loading"
          @success="handleSuccess"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button icon="Close" plain @click="active = false">取 消</el-button>
        <el-button type="success" icon="Download" plain @click="handleDownTemp">
          下载模板
        </el-button>
        <el-button
          type="primary"
          icon="Upload"
          plain
          @click="uploadExcelRef.submit()"
        >
          导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { reqSelfApplyItem, downTemp } from '@/api/grow/config'
import { ElMessage } from 'element-plus'
import bus from '@/utils/bus'
import type { UserApplyGrowthItems } from '@/api/grow/config/type'

const baseApi = import.meta.env.VITE_SERVE
const action = baseApi + '/grow/import'

const fromRef = ref()
const uploadExcelRef = ref()

const active = ref<boolean>(false)
const loading = ref<boolean>(false)
const applyGrowthItem = ref<UserApplyGrowthItems[]>([])
const form = reactive({
  recCode: '',
})

const coverApplyGrowthItem = computed(() => {
  return applyGrowthItem.value.map((item) => {
    let name = ''
    if (item.l1Name) {
      name += `${item.l1Name}--`
    }
    if (item.l2Name) {
      name += `${item.l1Name}--`
    }
    if (item.l3Name) {
      name += `${item.l1Name}--`
    }
    name += item.name
    return {
      id: item.id,
      code: item.code,
      name,
    }
  })
})

onMounted(() => {
  initGrowthItem()
})

const initGrowthItem = async () => {
  const { data: res } = await reqSelfApplyItem('teacher')
  applyGrowthItem.value = res
  form.recCode = applyGrowthItem.value[0].code
}

const open = () => {
  if (applyGrowthItem.value.length === 0)
    return ElMessage.error('没有可以导入的项目')
  active.value = true
}

const handleDownTemp = async () => {
  downTemp(form.recCode)
}

const handleSuccess = () => {
  active.value = false
  bus.emit('upload-success')
}

const handleClose = () => {
  form.recCode = applyGrowthItem.value[0].code
  uploadExcelRef.value.reset()
}

defineExpose({ open })
</script>
