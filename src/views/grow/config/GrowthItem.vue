<template>
  <el-row style="margin-top: 10px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form ref="searchFormRef" :model="searchForm" label-width="120px">
                <el-row>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="项目名称" prop="name">
                      <el-input v-model="searchForm.name" placeholder="请输入项目名称" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="分值计算类型" prop="calculateType">
                      <el-select
                        v-model="searchForm.calculateType"
                        placeholder="请选择分值计算类型"
                        style="width: 100%">
                        <el-option label="录入加分" :value="1" />
                        <el-option label="录入扣分" :value="2" />
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
            <el-button type="primary" @click="fetchList" :loading="loading">查询</el-button>
            <el-button @click="resetSearchForm">清空</el-button>
          </el-space>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card style="margin: 10px 0">
        <template #header>
          <el-space>
            <el-button type="primary" @click="addRow">
              <el-icon><Plus /></el-icon>
              添加
            </el-button>
            <el-divider direction="vertical" />
            <el-button :disabled="loading" circle @click="fetchList">
              <el-icon><Refresh /></el-icon>
            </el-button>
          </el-space>
        </template>

        <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
          <el-table-column prop="name" label="项目名称" show-overflow-tooltip align="center" />
          <el-table-column prop="code" label="项目编号" show-overflow-tooltip align="center" />
          <el-table-column prop="description" label="填报说明" show-overflow-tooltip align="center" />
          <el-table-column prop="fillPeriod" label="项目录入周期" show-overflow-tooltip align="center">
            <template #default="{ row }">
              {{ PERIOD.getKeyForValue(row.fillPeriod) }}
            </template>
          </el-table-column>
          <el-table-column prop="fillPeriodNum" label="项目周期内可录入次数" show-overflow-tooltip align="center" />
          <el-table-column prop="scorePeriod" label="分值刷新周期" show-overflow-tooltip align="center">
            <template #default="{ row }">
              {{ PERIOD.getKeyForValue(row.scorePeriod) }}
            </template>
          </el-table-column>
          <el-table-column prop="scoreUpperLimit" label="周期内分值的上限" show-overflow-tooltip align="center" />
          <el-table-column prop="calculateType" label="分值计算类型" show-overflow-tooltip align="center">
            <template #default="{ row }">
              {{ CALCULATE_TYPE.getKeyForValue(row.calculateType) }}
            </template>
          </el-table-column>
          <el-table-column prop="score" label="项目可获得分值" show-overflow-tooltip align="center" />
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center" />
          <el-table-column label="操作" width="300" align="center">
            <template #default="{ row }">
              <el-button @click="updateRow(row)">修改</el-button>
              <el-button @click="setGrowUserDrawerRef.open(row.id)">设置项目负责人</el-button>
              <el-button @click="delRow(row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-box">
          <el-pagination
            background
            :total="total"
            v-model:current-page="page.current"
            v-model:page-size="page.size"
            :page-sizes="[10, 20, 30, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next" />
        </div>
      </el-card>
    </el-col>
    <el-dialog v-model="active" :title="title" width="40%" draggable @close="resetForm">
      <el-form ref="formRef" :model="form" :rules="rules" :disabled="loading" label-position="top">
        <el-form-item label="所属项目" prop="growthItems">
          <el-cascader
            v-model="form.growthItems"
            placeholder="请选择所属项目"
            clearable
            :options="growthList"
            :props="cascaderProps"
            style="width: 100%" />
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="填报说明" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            show-word-limit
            maxlength="200"
            placeholder="请输入填报说明" />
        </el-form-item>
        <el-form-item label="项目录入周期" prop="fillPeriod">
          <el-select v-model="form.fillPeriod" placeholder="请选择项目录入周期" style="width: 100%">
            <el-option v-for="item in PERIOD.getDict()" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目周期内可录入次数" prop="fillPeriodNum">
          <el-input-number
            v-model="form.fillPeriodNum"
            :min="0"
            controls-position="right"
            placeholder="请输入项目周期内可录入次数"
            style="width: 100%" />
        </el-form-item>
        <el-form-item label="分值采集周期" prop="scorePeriod">
          <el-select v-model="form.scorePeriod" placeholder="请选择分值采集周期" style="width: 100%">
            <el-option v-for="item in PERIOD.getDict()" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="周期内分值的上限" prop="scoreUpperLimit">
          <el-input-number
            v-model="form.scoreUpperLimit"
            :min="0"
            controls-position="right"
            placeholder="请输入周期内分值的上限"
            style="width: 100%" />
        </el-form-item>
        <el-form-item label="分值计算类型" prop="calculateType">
          <el-radio-group v-model="form.calculateType">
            <el-radio v-for="item in CALCULATE_TYPE.getDict()" :key="item.value" :label="item.value" border>
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
            style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="active = false">
          <el-icon><Close /></el-icon>
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">
          <el-icon><Check /></el-icon>
          提交
        </el-button>
      </template>
    </el-dialog>
    <SetGrowUserDrawer ref="setGrowUserDrawerRef" />
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, h } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
  GrowthTreeVO,
  GrowthItemVO,
  getGrowthItemPage,
  saveOrUpdateGrowthItem,
  delGrowthItem,
} from '@/api/grow/config';
import { ElMessage, ElMessageBox } from 'element-plus';
import { PERIOD, CALCULATE_TYPE } from '@/utils/dict';
import Bus from '@/utils/bus';
import SetGrowUserDrawer from './SetGrowUserDrawer.vue';

/* Bus */
Bus.on('get-tree', (growthTree: GrowthTreeVO) => {
  growthList.value = growthTree;
});

Bus.on('node-click', (keys: number[]) => {
  searchForm.value.firstLevelId = keys[0];
  searchForm.value.secondLevelId = keys[1];
  searchForm.value.threeLevelId = keys[2];
  fetchList();
});

const cascaderProps = {
  label: 'name',
  value: 'id',
  children: 'children',
  // emitPath: false,
  checkStrictly: true,
  expandTrigger: 'hover',
};

/* Ref */
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();
const setGrowUserDrawerRef = ref();

/* Data */
const growthList = ref<GrowthTreeVO>();
const loading = ref<boolean>(false);
const active = ref<boolean>(false);
const title = ref<string>('');
const tableData = ref<GrowthItemVO[]>();
const page = ref({
  current: 1,
  size: 10,
});
const total = ref<number>(0);
const searchForm = ref({
  firstLevelId: void 0,
  secondLevelId: void 0,
  threeLevelId: void 0,
  id: void 0,
  name: void 0,
  calculateType: void 0,
});

const form = ref<GrowthItemVO>({
  id: undefined,
  name: '',
  code: '',
  description: '',
  fillPeriod: undefined,
  fillPeriodNum: undefined,
  scorePeriod: undefined,
  scoreUpperLimit: undefined,
  calculateType: undefined,
  score: undefined,
  growthItems: [],
  firstLevelId: undefined,
  secondLevelId: undefined,
  threeLevelId: undefined,
});
const rules = reactive<FormRules>({
  growthItems: [{ required: true, message: '请选择所属项目', trigger: 'blur' }],
  name: [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
  code: [{ required: true, message: '请填写项目编号', trigger: 'blur' }],
  fillPeriod: [{ required: true, message: '请填写项目录入周期', trigger: 'blur' }],
  scorePeriod: [{ required: true, message: '请填写分值刷新周期', trigger: 'blur' }],
  calculateType: [{ required: true, message: '请填写分值计算类型', trigger: 'blur' }],
  score: [{ required: true, message: '请填写项目可获得分值', trigger: 'blur' }],
});

/* Life Cycle */

onMounted(() => {
  fetchList();
});

/* Methods */

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getGrowthItemPage(Object.assign(page.value, searchForm.value));
    total.value = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};

const handleCurrentChange = (val: number) => {
  page.value.current = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  page.value.size = val;
  fetchList();
};

const addRow = () => {
  title.value = '添加';
  active.value = true;
};
const updateRow = (row: GrowthItemVO) => {
  title.value = '修改';
  form.value.id = row.id;
  form.value.name = row.name;
  form.value.code = row.code;
  form.value.description = row.description;
  form.value.fillPeriod = row.fillPeriod;
  form.value.fillPeriodNum = row.fillPeriodNum;
  form.value.scorePeriod = row.scorePeriod;
  form.value.scoreUpperLimit = row.scoreUpperLimit;
  form.value.calculateType = row.calculateType;
  form.value.score = row.score;
  if (row.firstLevelId) {
    form.value.growthItems.push(row.firstLevelId);
  }
  if (row.secondLevelId) {
    form.value.growthItems.push(row.secondLevelId);
  }
  if (row.threeLevelId) {
    form.value.growthItems.push(row.threeLevelId);
  }
  console.log(form.value);
  active.value = true;
};

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
      loading.value = true;
      try {
        if (!row.id) return console.error('项目id不存在');
        const res = await delGrowthItem(row.id);
        ElMessage.success(res.message);
        fetchList();
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {});
};

const submitForm = async () => {
  if (!formRef) return;
  const valid = await formRef.value?.validate();
  if (!valid) return;
  loading.value = true;
  form.value.firstLevelId = form.value.growthItems[0];
  form.value.secondLevelId = form.value.growthItems[1] || undefined;
  form.value.threeLevelId = form.value.growthItems[2] || undefined;
  try {
    const res = await saveOrUpdateGrowthItem(form.value);
    ElMessage.success(res.message);
    active.value = false;
    fetchList();
  } finally {
    loading.value = false;
  }
};

const resetSearchForm = () => {
  searchForm.value = {
    firstLevelId: void 0,
    secondLevelId: void 0,
    threeLevelId: void 0,
    id: void 0,
    name: void 0,
    calculateType: void 0,
  };
  searchFormRef.value?.resetFields();
};

const resetForm = () => {
  form.value = {
    id: undefined,
    name: '',
    code: '',
    description: '',
    fillPeriod: undefined,
    fillPeriodNum: undefined,
    scorePeriod: undefined,
    scoreUpperLimit: undefined,
    calculateType: undefined,
    score: undefined,
    growthItems: [],
    firstLevelId: undefined,
    secondLevelId: undefined,
    threeLevelId: undefined,
  };
  formRef.value?.resetFields();
};
</script>
