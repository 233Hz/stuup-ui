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
        <el-radio-group v-model="form.rec_code">
          <el-row>
            <el-col :span="8" v-for="item in growItems" :key="item.id">
              <el-radio :label="item.code" border style="margin: 5px">
                {{ item.name }}
              </el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <UploadExcel
          ref="uploadExcelRef"
          url="/api/grow/import"
          :data="form"
          :disabled="loading"
          @success="handleSuccess"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="active = false">取 消</el-button>
        <el-button type="success" @click="handleDownTemp">下载模板</el-button>
        <el-button type="primary" @click="uploadExcelRef.submit()">
          导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getUserGrowthItems, downTemp } from '@/api/grow/config'
import type { GrowthItemVO } from '@/api/grow/config/type'
import { ElMessage } from 'element-plus'
import bus from '@/utils/bus'
import UploadExcel from '@/components/UploadExcel.vue'

const fromRef = ref()
const uploadExcelRef = ref()

const active = ref<boolean>(false)
const loading = ref<boolean>(false)
const growItems = ref<GrowthItemVO[]>([])
const form = reactive({
  rec_code: '',
})

onMounted(() => {
  initGrowthItem()
})

const initGrowthItem = async () => {
  const { data: res } = await getUserGrowthItems()
  growItems.value = res
  form.rec_code = growItems.value[0].code
}

const open = () => {
  if (growItems.value.length === 0) return ElMessage.error('没有可以导入的项目')
  active.value = true
}

const handleDownTemp = async () => {
  downTemp(form.rec_code)
}

const handleSuccess = () => {
  active.value = false
  bus.emit('upload-success')
}

const handleClose = () => {
  form.rec_code = growItems.value[0].code
  uploadExcelRef.value.reset()
}

defineExpose({ open })
</script>
