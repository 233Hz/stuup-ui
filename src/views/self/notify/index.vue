<template>
  <div class="m-20">
    <el-card shadow="never" class="my-10">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="通知标题" prop="title">
                    <el-input v-model="searchForm.title" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="消息类型" prop="type">
                    <el-select v-model="searchForm.type" class="w-full">
                      <el-option
                        v-for="item in ANNOUNCEMENT_TYPE.getDict()"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <div style="text-align: center">
        <el-space>
          <el-button type="primary" @click="fetchList" :loading="loading">
            查询
          </el-button>
          <el-button @click="searchFormRef?.resetFields()">清空</el-button>
        </el-space>
      </div>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <el-space>
          <el-button type="primary" :disabled="loading" @click="router.back()">
            <el-icon><ArrowLeftBold /></el-icon>
            返回
          </el-button>
          <el-divider direction="vertical" />
          <el-button :disabled="loading" circle @click="fetchList">
            <el-icon><Refresh /></el-icon>
          </el-button>
        </el-space>
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
          prop="type"
          label="消息类型"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ ANNOUNCEMENT_TYPE.getKeyForValue(row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="router.push('/article/' + row.id)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-r">
        <el-pagination
          background
          :total="total"
          v-model:current-page="searchForm.current"
          v-model:page-size="searchForm.size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ANNOUNCEMENT_TYPE } from '@/utils/dict'
import { getAnnouncementMyPage } from '@/api/system/announcement'

const router = useRouter()

// REF
const searchFormRef = ref()
const formRef = ref()

// DATA
const loading = ref(false)
const total = ref(0)
const searchForm = ref({
  current: 1,
  size: 10,
  title: void 0,
  type: void 0,
})
const tableData = ref()

//ONMOUNTED
onMounted(() => {
  fetchList()
})

// METHODS
const fetchList = async () => {
  loading.value = true
  try {
    const { data } = await getAnnouncementMyPage(searchForm.value)
    total.value = data.total
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  searchForm.value.size = val
  fetchList()
}
</script>

<style scoped lang="scss"></style>
