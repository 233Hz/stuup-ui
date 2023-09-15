<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <el-page-header icon="ArrowLeft" @back="router.back()">
          <template #content>
            <span class="text-large font-600 mr-3">通知公告</span>
          </template>
        </el-page-header>
      </template>
      <template #default>
        <el-form
          ref="searchRef"
          :model="searchForm"
          label-width="80px"
          :disabled="loading"
        >
          <el-row>
            <el-col :sm="24" :md="12" :xl="6">
              <el-form-item label="通知标题" prop="title">
                <el-input v-model="searchForm.title" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item>
                <el-space>
                  <el-button
                    type="primary"
                    :loading="loading"
                    @click="fetchData"
                    plain
                  >
                    查询
                  </el-button>
                  <el-button plain @click="searchRef?.resetFields()">
                    清空
                  </el-button>
                  <el-button
                    icon="Refresh"
                    plain
                    :disabled="loading"
                    @click="fetchData"
                  >
                    刷新
                  </el-button>
                </el-space>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
    <el-card shadow="never">
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
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="router.push('/article/' + row.id)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          prop="createTime"
          label="发布时间"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
      </el-table>
      <div class="page-r">
        <el-pagination
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :page-sizes="[10, 20, 30, 50]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="
            (val: number) => {
              page.size = val
              fetchData()
            }
          "
          @current-change="
            (val: number) => {
              page.current = val
              fetchData()
            }
          "
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="MessageNotify">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqMyNotifyPage } from '@/api/system/announcement'
import { formatDate } from '@/utils/util'

const router = useRouter()

const searchRef = ref()

const loading = ref(false)
const total = ref(0)
const page = ref({ current: 1, size: 20 })
const tableData = ref()
const searchForm = ref({
  title: void 0,
})

onMounted(async () => {
  await fetchData()
})
const fetchData = async () => {
  loading.value = true
  try {
    const query = Object.assign(searchForm.value, page.value)
    const { data } = await reqMyNotifyPage(query)
    total.value = data.total
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
