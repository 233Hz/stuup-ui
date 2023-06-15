<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card shadow="never">
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form ref="searchFormRef" :model="searchForm" label-width="120px">
                <el-row>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="学生姓名" prop="studentName">
                      <el-input v-model="searchForm.studentName" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="学号" prop="studentNo">
                      <el-input v-model="searchForm.studentNo" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="所属班级" prop="studentNo">
                      <el-input v-model="searchForm.studentNo" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="所属年级" prop="gradeId">
                      <el-select v-model="searchForm.gradeId" style="width: 100%">
                        <el-option v-for="item in GRADE" :key="item.oid" :label="item.gradeName" :value="item.oid" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="所属系部" prop="faculyId">
                      <el-select v-model="searchForm.faculyId" style="width: 100%">
                        <el-option v-for="item in GRADE" :key="item.oid" :label="item.gradeName" :value="item.oid" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="所属专业" prop="majorId">
                      <el-select v-model="searchForm.majorId" style="width: 100%">
                        <el-option v-for="item in MAJOR" :key="item.oid" :label="item.majorName" :value="item.oid" />
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
            <el-button @click="searchFormRef?.resetFields()">清空</el-button>
          </el-space>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never" style="margin: 10px 0">
        <template #header>
          <el-space>
            <el-divider direction="vertical" />
            <el-button :disabled="loading" circle @click="fetchList">
              <el-icon><Refresh /></el-icon>
            </el-button>
          </el-space>
        </template>

        <div style="height: 800px">
          <el-auto-resizer v-loading="loading">
            <template #default="{ width, height }">
              <el-table-v2 :columns="columns" :data="tableData" :width="width" :height="height" />
            </template>
          </el-auto-resizer>
        </div>

        <!-- <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
          <el-table-column label="排名" type="index" width="55" align="center" />
          <el-table-column prop="year" label="年份" show-overflow-tooltip align="center" />
          <el-table-column prop="month" label="月份" show-overflow-tooltip align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="gradeName" label="所属年级" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="所属班级" show-overflow-tooltip align="center" />
          <el-table-column prop="classTeacher" label="班主任" show-overflow-tooltip align="center" />
          <el-table-column prop="facultyName" label="所属系部" show-overflow-tooltip align="center" />
          <el-table-column prop="majorName" label="所属专业" show-overflow-tooltip align="center" />
          <el-table-column prop="score" label="获得成长值" show-overflow-tooltip align="center" />
          <el-table-column prop="progressState" label="进步状态" show-overflow-tooltip align="center">
            <template #default="{ row }">
              {{ PROGRESS_STATE.getKeyForValue(row.progressState) }}
            </template>
          </el-table-column>
          <el-table-column prop="progressRanking" label="进步排名" show-overflow-tooltip align="center" />
        </el-table> -->
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FormInstance } from 'element-plus';
import { ProgressRankVO, getProgressRanking } from '@/api/ranking/progress';
import { getGraderList } from '@/api/basic/grade/index';
import { getMajorList } from '@/api/basic/major/index';
import { PROGRESS_STATE } from '@/utils/dict';

const columns = [
  { dataKey: 'year', key: 'year', title: '年份', width: 100 },
  { dataKey: 'month', key: 'month', title: '月份', width: 100 },
  { dataKey: 'studentName', key: 'studentName', title: '学生姓名', width: 100 },
  { dataKey: 'studentNo', key: 'studentNo', title: '学号', width: 100 },
  { dataKey: 'gradeName', key: 'gradeName', title: '所属年级', width: 100 },
  { dataKey: 'className', key: 'className', title: '所属班级', width: 100 },
  { dataKey: 'classTeacher', key: 'classTeacher', title: '班主任', width: 100 },
  { dataKey: 'facultyName', key: 'facultyName', title: '所属系部', width: 100 },
  { dataKey: 'majorName', key: 'majorName', title: '所属专业', width: 100 },
  { dataKey: 'score', key: 'score', title: '获得成长值', width: 100 },
  { dataKey: 'progressState', key: 'progressState', title: '进步状态', width: 100 },
];

onMounted(() => {
  initMajor();
  initGrade();
  fetchList();
});

// 字典
const GRADE = ref();
const MAJOR = ref();

const loading = ref<boolean>(false);
const tableData = ref<ProgressRankVO[]>([]);
const searchForm = ref({
  year: void 0,
  month: void 0,
  studentName: void 0,
  studentNo: void 0,
  className: void 0,
  gradeId: void 0,
  faculyId: void 0,
  majorId: void 0,
});
const searchFormRef = ref<FormInstance>();

const initMajor = async () => {
  const { data: res } = await getMajorList();
  MAJOR.value = res;
};

const initGrade = async () => {
  const { data: res } = await getGraderList();
  GRADE.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data } = await getProgressRanking(searchForm.value);
    tableData.value = data || [];
  } finally {
    loading.value = false;
  }
};
</script>
