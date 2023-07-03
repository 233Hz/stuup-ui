<template>
  <el-card shadow="never" style="width: 100%">
    <template #header>
      <el-form ref="searchFormRef" :model="searchForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户姓名" prop="username">
              <el-input v-model="searchForm.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型" prop="userType">
              <el-input v-model="searchForm.userType" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider />
      <div style="text-align: center">
        <el-space>
          <el-button type="primary">查询</el-button>
          <el-button @click="searchFormRef?.resetFields()">清空</el-button>
        </el-space>
      </div>
    </template>
    <el-table
      :data="tableData"
      max-height="400"
      style="width: 100%"
      border
      @select="handleSelect"
      @select-all="handleSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column label="用户姓名" prop="username" />
      <el-table-column label="用户类型" prop="userType">
        <template #default="{ row }">
          {{ USER_TYPE.getKeyForValue(row.userType) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="page-r">
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AnnouncementPremUserVO, getAnnouncementPremUser } from '@/api/system/announcement';
import { USER_TYPE } from '@/utils/dict';

const emit = defineEmits(['select']);

const searchFormRef = ref();

const searchForm = ref({
  current: 1,
  size: 10,
  username: void 0,
  userType: void 0,
});
const total = ref<number>(0);
const tableData = ref<AnnouncementPremUserVO[]>([]);

onMounted(() => {
  fetchList();
});

const fetchList = async () => {
  const { data } = await getAnnouncementPremUser(searchForm.value);
  total.value = data.total;
  tableData.value = data.records;
};

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  searchForm.value.size = val;
  fetchList();
};

const handleSelect = (list: AnnouncementPremUserVO[]) => {
  emit(
    'select',
    list.map(item => item.id)
  );
};
</script>

<style scoped lang="scss"></style>
