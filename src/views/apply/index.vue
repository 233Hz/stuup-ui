<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="一级项目" prop="firstLevelId">
                    <el-select v-model="searchForm.firstLevelId" @change="firstLevelChange" class="w-full">
                      <el-option v-for="item in FIRST_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="二级项目" prop="secondLevelId">
                    <el-select v-model="searchForm.secondLevelId" @change="secondLevelChange" class="w-full">
                      <el-option v-for="item in SECOND_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="三级项目" prop="thirdLevelId">
                    <el-select v-model="searchForm.thirdLevelId" class="w-full">
                      <el-option v-for="item in THIRD_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="项目名称" prop="growName">
                    <el-input v-model="searchForm.growName" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="状态" prop="state">
                    <el-select v-model="searchForm.state" class="w-full">
                      <el-option
                        v-for="item in AUDIT_STATUS.getDict()"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
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
            <el-icon><Search /></el-icon>
            查询
          </el-button>
          <el-button @click="searchFormRef?.resetFields()">
            <el-icon><Close /></el-icon>
            清空
          </el-button>
        </el-space>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <el-space>
          <el-button type="primary" @click="addRow">
            <el-icon><Plus /></el-icon>
            申请成长积分
          </el-button>
          <el-divider direction="vertical" />
          <el-button :disabled="loading" circle @click="fetchList">
            <el-icon><Refresh /></el-icon>
          </el-button>
        </el-space>
      </template>

      <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
        <el-table-column prop="firstLevelName" label="一级项目" show-overflow-tooltip align="center" />
        <el-table-column prop="secondLevelName" label="二级项目" show-overflow-tooltip align="center" />
        <el-table-column prop="thirdLevelName" label="三级项目" show-overflow-tooltip align="center" />
        <el-table-column prop="growName" label="成长项" show-overflow-tooltip align="center" />
        <el-table-column prop="auditor" label="审核人" show-overflow-tooltip align="center" />
        <el-table-column prop="state" label="审核状态" show-overflow-tooltip align="center">
          <template #default="{ row }">
            <el-tag v-show="row.state === AUDIT_STATUS.TO_BE_SUBMITTED" type="info">
              {{ AUDIT_STATUS.getKey('TO_BE_SUBMITTED') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.PENDING_REVIEW">
              {{ AUDIT_STATUS.getKey('PENDING_REVIEW') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.PASS" type="success">
              {{ AUDIT_STATUS.getKey('PASS') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.REFUSE" type="danger">
              {{ AUDIT_STATUS.getKey('REFUSE') }}
            </el-tag>
            <el-tag v-show="row.state === AUDIT_STATUS.RETURN" type="warning">
              {{ AUDIT_STATUS.getKey('RETURN') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center" />
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button @click="auditInfoRef.open(row)">审核信息</el-button>
            <el-button
              :disabled="row.state !== AUDIT_STATUS.TO_BE_SUBMITTED && row.state !== AUDIT_STATUS.RETURN"
              @click="submitRow(row.id)">
              提交
            </el-button>
            <el-button
              :disabled="row.state !== AUDIT_STATUS.TO_BE_SUBMITTED && row.state !== AUDIT_STATUS.RETURN"
              @click="updateRow(row)">
              修改
            </el-button>
            <el-button
              :disabled="row.state !== AUDIT_STATUS.TO_BE_SUBMITTED && row.state !== AUDIT_STATUS.RETURN"
              type="danger"
              @click="delRow(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-r">
        <el-pagination
          background
          :disabled="loading"
          :total="total"
          v-model:current-page="searchForm.current"
          v-model:page-size="searchForm.size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next" />
      </div>
    </el-card>
    <el-dialog v-model="active" :title="title" width="800" draggable @close="resetForm">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="申请项目" prop="growId">
          <el-select
            v-model="form.growId"
            placeholder="请选择申请项目"
            style="width: 100%"
            :disabled="title === '修改申请'"
            clearable>
            <el-option v-for="item in GROW_ITEM" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.desc }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请项目" prop="reason">
          <el-input
            v-model="form.reason"
            placeholder="请输入申请原因"
            type="textarea"
            maxlength="200"
            :rows="4"
            show-word-limit />
        </el-form-item>
        <el-form-item label="证明附件" prop="fileId">
          <div style="width: 100%">
            <el-upload
              ref="uploadRef"
              drag
              action="/api/file/upload"
              :headers="headers"
              :disabled="loading"
              :on-remove="handleUploadRemove"
              :on-success="handleUploadSuccess">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </div>
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
    <AuditInfo ref="auditInfoRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  getStudentGrowthItems,
  applyGrowItem,
  pageGrowApplyRecord,
  updateAudGrow,
  deleteAudGrow,
  submitGrowItem,
} from '@/api/apply';
import { GrowthTreeVO, getGrowthTree } from '@/api/grow/config';
import { requiredRule } from '@/utils/rules';
import { getToken } from '@/utils/auth';
import { AUDIT_STATUS } from '@/utils/dict';
import type { UploadProps } from 'element-plus';
import AuditInfo from '@/components/AuditInfo.vue';

//DICT
const GROWTH_TREE = ref<GrowthTreeVO[]>([]);
const FIRST_LEVEL = ref();
const SECOND_LEVEL = ref();
const THIRD_LEVEL = ref();
const GROW_ITEM = ref();

//REF
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();
const auditInfoRef = ref();

//DATA
const loading = ref<boolean>(false);
const active = ref<boolean>(false);
const title = ref<string>();
const tableData = ref();
const total = ref<number>(0);
const searchForm = ref({
  current: 1,
  size: 10,
  firstLevelId: undefined,
  secondLevelId: undefined,
  thirdLevelId: undefined,
  growName: void 0,
  state: void 0,
});
const form = ref({
  id: void 0,
  growId: void 0,
  reason: void 0,
  fileIds: void 0,
});
const rules = reactive<FormRules>({
  growId: [requiredRule('申请项目')],
  reason: [requiredRule('申请原因')],
});

//INIT
onMounted(() => {
  initGrowth();
  initGrowthItem();
  fetchList();
});

//COMPUTED
const headers = computed(() => {
  return {
    Authorization: getToken(),
  };
});

//WATCH

//METHODS

const initGrowth = async () => {
  const { data: res } = await getGrowthTree();
  GROWTH_TREE.value = res;
  FIRST_LEVEL.value = res;
};

const initGrowthItem = async () => {
  const { data } = await getStudentGrowthItems();
  GROW_ITEM.value = data.map(item => {
    return {
      id: item.id,
      name: item.name,
      desc: `${item.firstLevelName}-${item.secondLevelName}-${item.thirdLevelName}`,
    };
  });
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data } = await pageGrowApplyRecord(searchForm.value);
    total.value = data.total;
    tableData.value = data.records;
  } finally {
    loading.value = false;
  }
};

const findChildrenById = (list: GrowthTreeVO[], id: number): GrowthTreeVO[] | [] => {
  for (const item of list) {
    if (item.id === id) {
      return item.children || [];
    }
  }
  return [];
};

const firstLevelChange = (val: number) => {
  searchForm.value.secondLevelId = undefined;
  searchForm.value.thirdLevelId = undefined;
  SECOND_LEVEL.value = findChildrenById(FIRST_LEVEL.value, val);
};

const secondLevelChange = (val: number) => {
  searchForm.value.thirdLevelId = undefined;
  THIRD_LEVEL.value = findChildrenById(SECOND_LEVEL.value, val);
};

const addRow = () => {
  title.value = '申请成长积分';
  active.value = true;
};
const updateRow = row => {
  title.value = '修改申请';
  active.value = true;
  form.value.id = row.id;
  form.value.growId = row.growId;
  form.value.reason = row.reason;
  // form.value.fileIds = row.fileIds;
};
const delRow = (id: number) => {
  ElMessageBox.confirm('确认删除？', '删除该申请记录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'error',
  })
    .then(async () => {
      loading.value = true;
      try {
        const data = await deleteAudGrow(id);
        ElMessage.success(data.message);
        fetchList();
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {});
};

const submitRow = (id: number) => {
  ElMessageBox.confirm('确认提交？', '提交该申请记录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const data = await submitGrowItem(id);
        ElMessage.success(data.message);
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
  try {
    if (title.value === '申请成长积分') {
      const data = await applyGrowItem(form.value);
      ElMessage.success(data.message);
    }
    if (title.value === '修改申请') {
      const data = await updateAudGrow(form.value);
      ElMessage.success(data.message);
    }
    fetchList();
    active.value = false;
  } finally {
    loading.value = false;
  }
};

const handleUploadRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  const ids = uploadFiles.map(item => item.response.data.id).join(',');
  form.value.fileIds = ids;
};
const handleUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  const ids = uploadFiles.map(item => item.response.data.id).join(',');
  form.value.fileIds = ids;
};

const resetForm = () => {
  form.value = {
    id: void 0,
    growId: void 0,
    reason: void 0,
    fileIds: void 0,
  };
  formRef.value?.resetFields();
};

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  searchForm.value.size = val;
  fetchList();
};
</script>
