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
                    <el-form-item label="班级名称" prop="className">
                      <el-input v-model="searchForm.className" />
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
                        <el-option
                          v-for="item in FACULTY"
                          :key="item.oid"
                          :label="item.facultyName"
                          :value="item.oid" />
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
            <el-button @click="searchFormRef?.resetFields">清空</el-button>
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
          <el-table-column prop="className" label="班级名称" show-overflow-tooltip align="center" />
          <el-table-column prop="classTeacher" label="班主任" show-overflow-tooltip align="center" />
          <el-table-column prop="gradeName" label="所属年级" show-overflow-tooltip align="center" />
          <el-table-column prop="facultyName" label="所属系部" show-overflow-tooltip align="center" />
          <el-table-column prop="majorName" label="所属专业" show-overflow-tooltip align="center" />
          <el-table-column prop="score" label="总成长值" show-overflow-tooltip align="center" />
          <el-table-column label="成长等级" align="center">
            <template #default="{ row }">
              <flower-level-icon :score="row.score" />
            </template>
          </el-table-column>
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
import { getClassRanking } from '@/api/ranking/class';
import { getGraderList } from '@/api/basic/grade/index';
import { getFacultyList } from '@/api/basic/faculty';
import { getMajorList } from '@/api/basic/major/index';
import FlowerLevelIcon from '@/components/FlowerLevelIcon.vue';

onMounted(() => {
  initMajor();
  initFaculty();
  initGrade();
  fetchList();
});

// 字典
const GRADE = ref();
const MAJOR = ref();
const FACULTY = ref();

const loading = ref<boolean>(false);
const tableData = ref();
const total = ref<number>(0);
const searchForm = ref({
  current: 1,
  size: 50,
  className: undefined,
  gradeId: void 0,
  faculyId: void 0,
  majorId: void 0,
});
const searchFormRef = ref<FormInstance>();

const indexRank = (index: number) => {
  return (searchForm.value.current - 1) * searchForm.value.size + index + 1;
};

const initMajor = async () => {
  const { data: res } = await getMajorList();
  MAJOR.value = res;
};

const initFaculty = async () => {
  const { data: res } = await getFacultyList();
  FACULTY.value = res;
};

const initGrade = async () => {
  const { data: res } = await getGraderList();
  GRADE.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getClassRanking(searchForm.value);
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
