<template>
  <el-dialog v-model="active" title="任务详情" width="30%" @close="handleClose">
    <div v-loading="loading">
      <el-descriptions direction="vertical" :column="1" border>
        <el-descriptions-item label="申请项目">
          <span v-html="growth_name" />
        </el-descriptions-item>
        <el-descriptions-item label="申请原因">
          {{ applyRecord?.reason }}
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
                <el-button>预览文件</el-button>
                <el-button @click="downFile(row.storageName, row.originalName)">
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
                  <el-icon><CaretRight /></el-icon>
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
                    v-if="item.state === AUDIT_LOG_STATUS.REFUSE"
                    type="danger"
                  >
                    {{ AUDIT_LOG_STATUS.getKey('REFUSE') }}
                  </el-tag>
                  <el-tag
                    v-if="item.state === AUDIT_LOG_STATUS.RETURN"
                    type="warning"
                  >
                    {{ AUDIT_LOG_STATUS.getKey('RETURN') }}
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { AUDIT_LOG_STATUS } from '@/utils/dict'
import { getAuditLog } from '@/api/apply'
import { GrowApplyRecord } from '@/api/apply/type'
import { getFileListForIds, downFile } from '@/api/file'

// DATA
const active = ref<boolean>(false)
const loading = ref<boolean>(false)
const applyRecord = ref()
const auditLog = ref()
const fileData = ref()
const splitLine = '<span class="mx-8 text-red-500 font-bold">|</span>'
const growth_name = computed(() => {
  const firstLevelName = applyRecord.value?.firstLevelName || '无'
  const secondLevelName = applyRecord.value?.secondLevelName || '无'
  const thirdLevelName = applyRecord.value?.thirdLevelName || '无'
  const growName = applyRecord.value?.growName || '无'
  return `${firstLevelName}${splitLine}${secondLevelName}${splitLine}${thirdLevelName}${splitLine}${growName}`
})

//METHODS
const open = async (info: GrowApplyRecord) => {
  loading.value = true
  try {
    applyRecord.value = info
    const { data: logs } = await getAuditLog(info.id)
    auditLog.value = logs
    if (info.fileIds) {
      const { data: files } = await getFileListForIds(info.fileIds)
      fileData.value = files
    }
    active.value = true
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  loading.value = false
  applyRecord.value = {}
  auditLog.value = []
  fileData.value = []
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
