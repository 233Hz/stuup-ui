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
                    <el-form-item label="学年" prop="yearId">
                      <el-select v-model="searchForm.yearId" style="width: 100%">
                        <el-option v-for="item in YEAR" :key="item.oid" :label="item.value" :value="item.oid" />
                      </el-select>
                    </el-form-item>
                  </el-col>
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

        <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
          <el-table-column label="排名" type="index" width="55" align="center" :index="indexRank" />
          <el-table-column prop="yearName" label="学年" show-overflow-tooltip align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="gradeName" label="所属年级" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="所属班级" show-overflow-tooltip align="center" />
          <el-table-column prop="classTeacher" label="班主任" show-overflow-tooltip align="center" />
          <el-table-column prop="facultyName" label="所属系部" show-overflow-tooltip align="center" />
          <el-table-column prop="majorName" label="所属专业" show-overflow-tooltip align="center" />
          <el-table-column prop="score" label="获得成长值" show-overflow-tooltip align="center" />
        </el-table>
        <div class="page-box">
          <el-pagination
            background
            :total="total"
            v-model:current-page="searchForm.current"
            v-model:page-size="searchForm.size"
            :page-sizes="[10, 20, 30, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FormInstance } from 'element-plus';
import { getYearRanking } from '@/api/ranking/year/index';
import { getYearList } from '@/api/basic/year/index';
import { getGraderList } from '@/api/basic/grade/index';
import { getMajorList } from '@/api/basic/major/index';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

onMounted(async () => {
  initYear();
  initMajor();
  initGrade();
  fetchList();
});

// 字典
const YEAR = ref();
const GRADE = ref();
const MAJOR = ref();

const loading = ref<boolean>(false);
const tableData = ref();
const total = ref<number>(0);
const searchForm = ref({
  current: 1,
  size: 50,
  yearId: userStore.getYearId as number,
  studentName: void 0,
  studentNo: void 0,
  className: void 0,
  gradeId: void 0,
  faculyId: void 0,
  majorId: void 0,
});
const searchFormRef = ref<FormInstance>();

const indexRank = (index: number) => {
  return (searchForm.value.current - 1) * searchForm.value.size + index + 1;
};

const initYear = async () => {
  const { data: res } = await getYearList();
  YEAR.value = res;
};
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
    const { data: res } = await getYearRanking(searchForm.value);
    total.value = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
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
