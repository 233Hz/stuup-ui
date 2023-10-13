<template>
  <el-dialog
    v-model="show"
    title="导入采集数据"
    width="30%"
    center
    @close="dialogCloseHandler"
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
          @success="uploadSuccessHandler"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="success" @click="downTempHandler">下载模板</el-button>
        <el-button type="primary" @click="uploadExcelRef.submit()">
          导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { reqSelfApplyItem, downTemp } from '@/api/grow/config'
import { UserApplyGrowthItems } from '@/api/grow/config/type'

const baseApi = import.meta.env.VITE_SERVE
const action = baseApi + '/audGrow/apply/import'
const uploadExcelRef = ref()
const show = ref(false)
const loading = ref(false)
const applyGrowthItem = ref<UserApplyGrowthItems[]>([])
const form = ref<any>({
  recCode: void 0,
})
const open = () => (show.value = true)

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

const fetchApplyGrowthItem = async () => {
  const { data } = await reqSelfApplyItem('studentUnion')
  applyGrowthItem.value = data
}
const downTempHandler = () => downTemp(form.value.recCode)
onMounted(async () => {
  await fetchApplyGrowthItem()
})
const uploadSuccessHandler = () => {
  show.value = false
  emit('upload-success')
}
const dialogCloseHandler = () => {
  form.value.recCode = void 0
  uploadExcelRef.value.reset()
}

const emit = defineEmits<{
  (e: 'upload-success'): void
}>()
defineExpose({ open })
</script>
