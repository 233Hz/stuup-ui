<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="项目名称" prop="name">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入项目名称"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="分值计算类型" prop="calculateType">
              <el-select
                v-model="searchForm.calculateType"
                placeholder="请选择分值计算类型"
                style="width: 100%"
              >
                <el-option label="录入加分" :value="1" />
                <el-option label="录入扣分" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item>
              <el-space>
                <el-button
                  type="primary"
                  icon="Search"
                  plain
                  @click="fetchList"
                  :loading="loading"
                >
                  查询
                </el-button>
                <el-button icon="Close" plain @click="resetSearchHandle">
                  清空
                </el-button>
                <el-button
                  type="primary"
                  icon="Plus"
                  plain
                  v-permission="'growth_item_add_edit'"
                  @click="addRow"
                >
                  添加
                </el-button>
                <el-button
                  icon="Refresh"
                  plain
                  :disabled="loading"
                  circle
                  @click="fetchList"
                />
              </el-space>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        empty-text="空空如也~~"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="项目名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="code"
          label="项目编号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="description"
          label="填报说明"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="scorePeriod"
          label="分值刷新周期"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ PERIOD.getKeyForValue(row.scorePeriod) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="scoreUpperLimit"
          label="周期内分值的上限"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="collectLimit"
          label="可采集次数"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="calculateType"
          label="分值计算类型"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ CALCULATE_TYPE.getKeyForValue(row.calculateType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="项目可获得分值"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="gatherer"
          label="项目采集类型"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ GROWTH_GATHERER.getKeyForValue(row.gatherer) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button
              bg
              text
              icon="Edit"
              v-permission="'growth_item_add_edit'"
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              bg
              text
              icon="Setting"
              v-permission="'growth_item_admin'"
              v-show="row.gatherer !== GROWTH_GATHERER.STUDENT"
              @click="setGrowUserDrawerRef.open(row.id, row.gatherer)"
            >
              设置项目负责人
            </el-button>
            <el-button
              bg
              text
              type="danger"
              icon="Delete"
              v-permission="'growth_item_del'"
              @click="delRow(row)"
            >
              删除
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
      <Pagination @size-change="fetchList" @current-change="fetchList" />
    </el-card>
    <el-dialog
      v-model="active"
      :title="DIALOG_TYPE.getKeyForValue(dialogType)"
      width="30%"
      draggable
      @close="resetFormHandle"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :disabled="loading"
        label-position="top"
      >
        <el-form-item label="所属项目" prop="growthItems">
          <el-cascader
            v-model="form.growthItems"
            placeholder="请选择所属项目"
            clearable
            :options="growthStore.level1"
            :props="cascadeProps"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="填报说明" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            show-word-limit
            maxlength="200"
            placeholder="请输入填报说明"
          />
        </el-form-item>
        <el-form-item label="分值采集周期" prop="scorePeriod">
          <el-select
            v-model="form.scorePeriod"
            placeholder="请选择分值采集周期"
            style="width: 100%"
          >
            <el-option
              v-for="item in PERIOD.getDict()"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="周期内分值的上限"
          prop="scoreUpperLimit"
          v-show="form.scorePeriod !== PERIOD.UNLIMITED"
        >
          <el-input-number
            v-model="form.scoreUpperLimit"
            :min="0"
            controls-position="right"
            placeholder="请输入周期内分值的上限"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          label="可采集次数"
          prop="collectLimit"
          v-show="form.scorePeriod === PERIOD.UNLIMITED"
        >
          <el-input-number
            v-model="form.collectLimit"
            :min="1"
            controls-position="right"
            placeholder="请输入可采集次数"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="分值计算类型" prop="calculateType">
          <el-radio-group v-model="form.calculateType">
            <el-radio
              v-for="item in CALCULATE_TYPE.getDict()"
              :key="item.value"
              :label="item.value"
              border
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目可获得分值" prop="score">
          <el-input-number
            v-model="form.score"
            :min="0"
            controls-position="right"
            placeholder="请输入分值"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="项目采集者" prop="gatherer">
          <el-radio-group v-model="form.gatherer">
            <el-radio
              v-for="item in GROWTH_GATHERER_TYPE.getDict()"
              :key="item.value"
              :label="item.value"
              border
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button icon="Close" @click="active = false">取 消</el-button>
        <el-button
          type="primary"
          icon="Check"
          :loading="loading"
          @click="submitForm"
        >
          提 交
        </el-button>
      </template>
    </el-dialog>
    <set-grow-user-drawer ref="setGrowUserDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref, watch } from 'vue'
import {
  delGrowthItem,
  getGrowthItemPage,
  saveOrUpdateGrowthItem,
} from '@/api/grow/config'
import type { FormInstance, FormRules } from 'element-plus'
import { CascaderProps, ElMessage, ElMessageBox } from 'element-plus'
import {
  CALCULATE_TYPE,
  DIALOG_TYPE,
  GROWTH_GATHERER,
  GROWTH_GATHERER_TYPE,
  PERIOD,
} from '@/utils/dict'
import { requiredRule } from '@/utils/rules'
import { formatDate } from '@/utils/util'
import type { GrowthItemVO } from '@/api/grow/config/type'
import bus from '@/utils/bus'
import useGrowthStore from '@/store/modules/growth'
import usePaginationStore from '@/store/modules/pagination'
import SetGrowUserDrawer from '../SetGrowUserDrawer/index.vue'

const growthStore = useGrowthStore()
const paginationStore = usePaginationStore()

/* Bus */
bus.on('node-click', (keys: number[]) => {
  searchForm.value.firstLevelId = keys[0]
  searchForm.value.secondLevelId = keys[1]
  searchForm.value.threeLevelId = keys[2]
  fetchList()
})

const cascadeProps: CascaderProps = {
  label: 'name',
  value: 'id',
  children: 'children',
  checkStrictly: true,
  expandTrigger: 'hover',
}

/* Ref */
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()
const setGrowUserDrawerRef = ref()

/* Data */
const loading = ref<boolean>(false)
const active = ref<boolean>(false)
const dialogType = ref<string>('')
const tableData = ref<GrowthItemVO[]>()

const searchForm = ref<any>({
  name: void 0,
  calculateType: void 0,
  firstLevelId: void 0,
  secondLevelId: void 0,
  threeLevelId: void 0,
})

const form = ref<any>({
  id: void 0,
  growthItems: [],
  name: void 0,
  description: void 0,
  scorePeriod: void 0,
  scoreUpperLimit: void 0,
  collectLimit: void 0,
  calculateType: void 0,
  score: void 0,
  gatherer: void 0,
})
const rules = ref<FormRules>({
  growthItems: [requiredRule('所属项目不能为空')],
  name: [requiredRule('项目名称不能为空')],
  scorePeriod: [requiredRule('分值刷新周期不能为空')],
  calculateType: [requiredRule('分值计算类型不能为空')],
  score: [requiredRule('项目可获得分值不能为空')],
})

/* ONMOUNTED */

onMounted(() => {
  fetchList()
})

/* WATCH */
watch(
  () => form.value.scorePeriod,
  (newValue) => {
    if (newValue === PERIOD.UNLIMITED) {
      form.value.scoreUpperLimit = void 0
    } else {
      form.value.collectLimit = void 0
    }
  },
)

/* Methods */

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getGrowthItemPage(query)
    paginationStore.setTotal(res.total)
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const addRow = () => {
  dialogType.value = DIALOG_TYPE.ADD
  active.value = true
}
const updateRow = (row: GrowthItemVO) => {
  dialogType.value = DIALOG_TYPE.EDIT
  form.value.id = row.id
  form.value.name = row.name
  form.value.description = row.description
  form.value.scorePeriod = row.scorePeriod
  form.value.scoreUpperLimit = row.scoreUpperLimit
  form.value.collectLimit = row.collectLimit
  form.value.calculateType = row.calculateType
  form.value.score = row.score
  if (row.gatherer !== GROWTH_GATHERER.STUDENT)
    form.value.gatherer = GROWTH_GATHERER_TYPE.ASSIGN
  else form.value.gatherer = row.gatherer
  form.value.growthItems = []
  if (row.firstLevelId) {
    form.value.growthItems.push(row.firstLevelId)
  }
  if (row.secondLevelId) {
    form.value.growthItems.push(row.secondLevelId)
  }
  if (row.threeLevelId) {
    form.value.growthItems.push(row.threeLevelId)
  }
  active.value = true
}

const delRow = (row: GrowthItemVO) => {
  ElMessageBox({
    title: '删除成长项',
    message: h('p', null, [
      h('span', null, '确认删除该项：'),
      h('strong', { style: 'color: #409EFF; font-size: 18px' }, row.name),
    ]),
    showCancelButton: true,
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
  })
    .then(async () => {
      loading.value = true
      try {
        if (!row.id) return console.error('项目id不存在')
        const res = await delGrowthItem(row.id)
        ElMessage.success(res.msg)
        await fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const submitForm = async () => {
  if (!formRef) return
  const valid = await formRef.value?.validate()
  if (!valid) return
  loading.value = true
  if (form.value.gatherer !== GROWTH_GATHERER_TYPE.STUDENT)
    form.value.gatherer = void 0
  if (form.value.growthItems && form.value.growthItems.length > 0) {
    form.value.firstLevelId = form.value.growthItems[0]
    form.value.secondLevelId = form.value.growthItems[1] || void 0
    form.value.threeLevelId = form.value.growthItems[2] || void 0
  } else {
    ElMessage.warning('请选择所属项目')
  }
  try {
    const res = await saveOrUpdateGrowthItem(form.value as GrowthItemVO)
    ElMessage.success(res.msg)
    active.value = false
    await fetchList()
  } finally {
    loading.value = false
  }
}

const resetFormHandle = () => {
  form.value = {
    id: void 0,
    growthItems: [],
    name: void 0,
    description: void 0,
    scorePeriod: void 0,
    scoreUpperLimit: void 0,
    collectLimit: void 0,
    calculateType: void 0,
    score: void 0,
    gatherer: void 0,
  }
  formRef.value?.clearValidate()
}

const resetSearchHandle = () => {
  searchForm.value = {
    name: void 0,
    calculateType: void 0,
    firstLevelId: void 0,
    secondLevelId: void 0,
    threeLevelId: void 0,
  }
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
