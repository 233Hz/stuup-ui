<template>
  <div>
    <el-card shadow="never">
      <el-form ref="searchFormRef" :model="search">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="学年" prop="yearId">
              <el-select
                v-model="search.yearId"
                style="width: 100%"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="学期" prop="semesterId">
              <el-select
                v-model="search.yearId"
                style="width: 100%"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="一级项目" prop="firstLevelId">
              <el-select
                v-model="search.yearId"
                style="width: 100%"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="二级项目" prop="secondLevelId">
              <el-select
                v-model="search.yearId"
                style="width: 100%"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="三级项目" prop="thirdLevelId">
              <el-select
                v-model="search.yearId"
                style="width: 100%"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="项目名称" prop="growthName">
              <el-input v-model="search.growthName" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item class="flex justify-center">
              <el-space>
                <el-button type="primary" @click="" :loading="loading">
                  <el-icon><Search /></el-icon>
                  查询
                </el-button>
                <el-button @click="searchFormRef?.resetFields()">
                  <el-icon><Close /></el-icon>
                  清空
                </el-button>
                <el-button>
                  <el-icon><Refresh /></el-icon>
                  刷新
                </el-button>
                <el-button type="primary">
                  <el-icon><Upload /></el-icon>
                  导入采集数据
                </el-button>
              </el-space>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        empty-text="空空如也~~"
      >
        <el-table-column
          prop="yearName"
          label="学年"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="semesterName"
          label="学期"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="growName"
          label="项目名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="thirdLevelName"
          label="三级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="secondLevelName"
          label="二级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="firstLevelName"
          label="一级项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="growthSCore"
          label="项目积分"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="studentName"
          label="学生姓名"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="classTeacher"
          label="班主任"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="className"
          label="班级名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="state"
          label="审核状态"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            <el-tag
              v-show="row.state === AUDIT_STATUS.TO_BE_SUBMITTED"
              type="info"
            >
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
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button>审核信息</el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
            >
              提交
            </el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
            >
              修改
            </el-button>
            <el-button
              :disabled="
                row.state !== AUDIT_STATUS.TO_BE_SUBMITTED &&
                row.state !== AUDIT_STATUS.RETURN
              "
              type="danger"
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
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '@/utils/util'
import { AUDIT_STATUS } from '@/utils/dict'

const loading = ref(false)
const searchFormRef = ref()
const search = ref({
  yearId: void 0,
  semesterId: void 0,
  firstLevelId: void 0,
  secondLevelId: void 0,
  thirdLevelId: void 0,
  growthName: void 0,
})
const tableData = ref([{}])
</script>

<style scoped lang="scss">
.el-card {
  margin: 10px;
}
</style>
