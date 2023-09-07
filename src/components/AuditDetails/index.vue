<template>
  <div>
    <el-dialog
      v-model="active"
      title="任务详情"
      width="30%"
      @close="handleClose"
    >
      <div v-loading="loading">
        <el-descriptions direction="vertical" :column="1" border>
          <el-descriptions-item label="申请项目">
            <span v-html="growth_name" />
          </el-descriptions-item>
          <el-descriptions-item label="申请原因">
            {{ auditDetails?.reason || '无' }}
          </el-descriptions-item>
          <el-descriptions-item label="证明附件">
            <el-table
              :data="fileData"
              border
              stripe
              v-loading="loading"
              empty-text="未上传附件"
              style="width: 100%"
            >
              <el-table-column
                prop="originalName"
                label="文件名"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="createTime"
                label="上传时间"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column label="操作" align="center">
                <template #default="{ row }">
                  <el-button @click="previewImageHandler(row.storageName)">
                    预览文件
                  </el-button>
                  <el-button
                    @click="downFile(row.storageName, row.originalName)"
                  >
                    下载文件
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-descriptions-item>
          <el-descriptions-item label="审核进度">
            <el-timeline>
              <el-timeline-item
                v-if="auditLog && auditLog.length > 0"
                v-for="item in auditLog"
                :key="item.id"
                :timestamp="item.createTime"
                placement="top"
              >
                <el-card>
                  <h3>
                    {{ item.username }}
                    <el-icon>
                      <CaretRight />
                    </el-icon>
                    <el-tag v-if="item.state === AUDIT_LOG_STATUS.SUBMIT">
                      {{ AUDIT_LOG_STATUS.getKey('SUBMIT') }}
                    </el-tag>
                    <el-tag
                      v-if="item.state === AUDIT_LOG_STATUS.PASS"
                      type="success"
                    >
                      {{ AUDIT_LOG_STATUS.getKey('PASS') }}
                    </el-tag>
                    <el-tag
                      v-if="item.state === AUDIT_LOG_STATUS.NO_PASS"
                      type="danger"
                    >
                      {{ AUDIT_LOG_STATUS.getKey('NO_PASS') }}
                    </el-tag>
                  </h3>
                  <p>{{ item.reason }}</p>
                </el-card>
              </el-timeline-item>
              <p v-else class="text-center">暂无审核进度</p>
            </el-timeline>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
    <el-image-viewer
      v-if="viewImageVisible"
      :url-list="[imgSrc]"
      @close="imageViewerCloseHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { AUDIT_LOG_STATUS } from '@/utils/dict'
import { getAuditLog } from '@/api/apply'
import { getFileListForIds, downFile, reqFileUrl } from '@/api/file'

interface AuditDetailsType {
  id: number
  l1Name: string
  l2Name: string
  l3Name: string
  growthItemName: string
  fileIds?: string
  reason?: string
}

// DATA
const active = ref<boolean>(false)
const viewImageVisible = ref<boolean>(false)
const loading = ref<boolean>(false)
const auditDetails = ref<AuditDetailsType>()
const auditLog = ref()
const fileData = ref()
const splitLine = '<span class="mx-8 text-red-500 font-bold">|</span>'
const growth_name = computed(() => {
  const l1Name = auditDetails.value?.l1Name || '无'
  const l2Name = auditDetails.value?.l2Name || '无'
  const l3Name = auditDetails.value?.l3Name || '无'
  const growthItemName = auditDetails.value?.growthItemName || '无'
  return `${l1Name}${splitLine}${l2Name}${splitLine}${l3Name}${splitLine}${growthItemName}`
})
const imgSrc = ref<string>('')

//METHODS
const open = async (details: AuditDetailsType) => {
  active.value = true
  loading.value = true
  try {
    auditDetails.value = details
    const { data: logs } = await getAuditLog(details.id)
    auditLog.value = logs
    if (details.fileIds) {
      const { data: files } = await getFileListForIds(details.fileIds)
      fileData.value = files
    }
  } finally {
    loading.value = false
  }
}

const previewImageHandler = async (fileName: string) => {
  const { data } = await reqFileUrl(fileName)
  imgSrc.value = data
  viewImageVisible.value = true
}

const handleClose = () => {
  loading.value = false
  auditDetails.value = void 0
  auditLog.value = []
  fileData.value = []
}

const imageViewerCloseHandler = () => {
  viewImageVisible.value = false
}

defineExpose({ open })
</script>

<style scoped lang="scss">
.dialog-container {
  height: 500px;
  display: flex;

  > div {
    padding: 0 20px;
    flex: 1;
  }
}
</style>
