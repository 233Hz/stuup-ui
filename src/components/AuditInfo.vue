<template>
  <el-dialog v-model="active" title="任务详情" width="60%" @close="handleClose">
    <div class="dialog-container" v-loading="loading">
      <div class="info-content">
        <el-scrollbar>
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item label="一级项目">
              {{ applyRecord?.firstLevelName }}
            </el-descriptions-item>
            <el-descriptions-item label="二级项目">
              {{ applyRecord?.secondLevelName }}
            </el-descriptions-item>
            <el-descriptions-item label="三级项目">
              {{ applyRecord?.thirdLevelName }}
            </el-descriptions-item>
            <el-descriptions-item label="成长项目">
              {{ applyRecord?.growName }}
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
                <el-table-column label="操作" width="120" align="center">
                  <template #default="{ row }">
                    <el-button
                      @click="downFile(row.storageName, row.originalName)"
                    >
                      下载文件
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-descriptions-item>
          </el-descriptions>
        </el-scrollbar>
      </div>
      <div class="audit-content">
        <el-scrollbar>
          <el-timeline>
            <el-timeline-item
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
          </el-timeline>
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AUDIT_LOG_STATUS } from '@/utils/dict'
import { GrowApplyRecordVO, getAuditLog, AuditLogVO } from '@/api/apply'
import { getFileListForIds, downFile, FileVO } from '@/api/file'

// DATA
const active = ref<boolean>(false)
const loading = ref<boolean>(false)
const applyRecord = ref<GrowApplyRecordVO>()
const auditLog = ref<AuditLogVO[]>([])
const fileData = ref<FileVO[]>([])

//METHODS
const open = async (info: GrowApplyRecordVO) => {
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
