<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form ref="searchRef" :model="searchForm" label-width="80px">
                <el-row>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="学年" prop="yearId">
                      <el-select
                        v-model="searchForm.yearId"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in dictionaryStore.year"
                          :key="item.oid"
                          :label="item.value"
                          :value="item.oid"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="一级项目" prop="firstLevelId">
                      <el-select
                        v-model="searchForm.firstLevelId"
                        @change="
                          (id: number) => {
                            growthStore.handleLevel1Change(id)
                            searchForm.secondLevelId = void 0
                            searchForm.threeLevelId = void 0
                          }
                        "
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in growthStore.level1"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="二级项目" prop="secondLevelId">
                      <el-select
                        v-model="searchForm.secondLevelId"
                        @change="
                          (id: number) => {
                            growthStore.handleLevel2Change(id)
                            searchForm.threeLevelId = void 0
                          }
                        "
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in growthStore.level2"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="三级项目" prop="threeLevelId">
                      <el-select
                        v-model="searchForm.threeLevelId"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in growthStore.level3"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="成长项目" prop="growName">
                      <el-input v-model="searchForm.growName" />
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
            <el-button @click="searchRef?.resetFields()">清空</el-button>
          </el-space>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      <el-card>
        <template #header>
          <div class="card-header">
            <el-space>
              <el-button type="primary" @click="collectFormRef.open()">
                <el-icon class="el-icon--left"><Upload /></el-icon>
                导入成长项目
              </el-button>
              <!--              <el-button type="warning" @click="handleTask(1)">-->
              <!--                计算每天积分（测试）-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(2)">-->
              <!--                计算每周积分（测试）-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(3)">-->
              <!--                计算每月积分（测试）-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(4)">-->
              <!--                计算每学期积分（测试）-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(5)">-->
              <!--                计算每年积分（测试）-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(6)">-->
              <!--                生成当前学年和学期-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(7)">-->
              <!--                统计本月榜单数据-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(8)">-->
              <!--                统计学年榜单数据-->
              <!--              </el-button>-->
              <!--              <el-button type="warning" @click="handleTask(9)">-->
              <!--                统计学期榜单数据-->
              <!--              </el-button>-->
              <el-divider direction="vertical" />
              <el-button :disabled="loading" circle @click="fetchList">
                <el-icon><Refresh /></el-icon>
              </el-button>
            </el-space>
          </div>
        </template>
        <el-row style="width: 100%">
          <el-col :span="24">
            <el-table
              :data="tableData"
              border
              stripe
              v-loading="loading"
              empty-text="空空如也~~"
              style="width: 100%"
            >
              <el-table-column
                prop="yearName"
                label="学年"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="firstLevelName"
                label="一级栏目"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="secondLevelName"
                label="二级栏目"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="threeLevelName"
                label="三级栏目"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="growName"
                label="成长项目"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="createUser"
                label="创建人"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column label="操作" width="200" align="center">
                <template #default="{ row }">
                  <el-button @click="collectDetailsRef.open(row.batchCode)">
                    <el-icon class="el-icon--left"><View /></el-icon>
                    查看详情
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                show-overflow-tooltip
                align="center"
              >
                <template #default="{ row }">
                  {{ formatDate(row.createTime, 'YYYY-MM-DD') }}
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
            <Pagination @size-change="fetchList" @current-change="fetchList" />
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <CollectForm ref="collectFormRef" />
    <CollectDetails ref="collectDetailsRef" />
  </el-row>
</template>

<script setup lang="ts" name="Collect">
import { onMounted, ref } from 'vue'
import { getRecLogPage } from '@/api/collect'
import { manualTask } from '@/api/grow/config'
import { formatDate } from '@/utils/util'
import bus from '@/utils/bus'
import { ElMessage, type FormInstance } from 'element-plus'
import type { GrowthTreeVO } from '@/api/grow/config/type'
import CollectForm from './CollectForm.vue'
import CollectDetails from './CollectDetails.vue'
import useGrowthStore from '@/store/modules/growth'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'

const growthStore = useGrowthStore()
const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

bus.on('upload-success', () => {
  fetchList()
})

onMounted(async () => {
  await growthStore.init()
  await fetchList()
  await dictionaryStore.init()
})

// Ref
const collectFormRef = ref()
const collectDetailsRef = ref()

const loading = ref<boolean>(false)
const tableData = ref()

const searchForm = ref({
  yearId: void 0,
  firstLevelId: void 0,
  secondLevelId: void 0,
  threeLevelId: void 0,
  growName: void 0,
})
const searchRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getRecLogPage(query)
    paginationStore.setTotal(res.total)
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const findChildrenById = (
  list: GrowthTreeVO[],
  id: number,
): GrowthTreeVO[] | [] => {
  for (const item of list) {
    if (item.id === id) {
      return item.children || []
    }
    if (item.children) {
      return findChildrenById(item.children, id)
    }
  }
  return []
}

// =======================测试=======================
const handleTask = async (num: number) => {
  try {
    await manualTask(num)
    ElMessage.success('执行成功')
  } catch {
    ElMessage.error('执行失败')
  }
}
</script>
