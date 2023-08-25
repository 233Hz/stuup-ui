<template>
  <div class="m-20">
    <el-card shadow="never" class="my-10">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form
              ref="searchFormRef"
              :model="searchForm"
              label-width="80px"
              :disabled="loading"
            >
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="消息类型">
                    <el-select v-model="searchForm.type" class="w-full">
                      <el-option
                        v-for="item in ANNOUNCEMENT_TYPE.getDict()"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="通知标题" prop="title">
                    <el-input v-model="searchForm.title" />
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
      <Pagination @size-change="fetchList" @current-change="fetchList" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ANNOUNCEMENT_TYPE } from '@/utils/dict'
import { reqMyNotifyPage, reqMySystemPage } from '@/api/system/announcement'
import usePaginationStore from '@/store/modules/pagination'

const router = useRouter()
const paginationStore = usePaginationStore()

// REF
const searchFormRef = ref()

// DATA
const loading = ref(false)
const tableData = ref()
const searchForm = ref({
  type: ANNOUNCEMENT_TYPE.NOTIFY,
  title: void 0,
})

//WATCH
watch(
  () => searchForm.value.type,
  () => {
    fetchList()
  },
)

onMounted(() => {
  fetchList()
})

// METHODS
const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    if (searchForm.value.type === ANNOUNCEMENT_TYPE.NOTIFY) {
      const { data } = await reqMyNotifyPage(query)
      paginationStore.setTotal(data.total)
      tableData.value = data.records
    } else if (searchForm.value.type === ANNOUNCEMENT_TYPE.SYSTEM) {
      const { data } = await reqMySystemPage(query)
      paginationStore.setTotal(data.total)
      tableData.value = data.records
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss"></style>
