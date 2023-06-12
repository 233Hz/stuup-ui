<template>
  <div class="container">
    <div class="hover-container"></div>
    <transition name="fade">
      <div v-show="show" class="content">
        <el-table :data="tableData" stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
          <el-table-column label="排名" type="index" width="55" align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="所属班级" show-overflow-tooltip align="center" />
          <el-table-column prop="classTeacher" label="班主任" show-overflow-tooltip align="center" />
          <el-table-column prop="score" label="成长值" show-overflow-tooltip align="center" />
          <el-table-column label="成长等级" align="center">
            <template #default="{ row }">
              <flower-level-icon :score="row.score" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getSchoolRanking } from '@/api/ranking/school';
import { useUserStore } from '@/store/modules/user';
import FlowerLevelIcon from '@/components/FlowerLevelIcon.vue';

const userStore = useUserStore();

const tableData = ref();
const loading = ref<boolean>(false);
const show = ref<boolean>(false);

let hoverContainer: HTMLDivElement;
let container: HTMLDivElement;
const page = ref({
  current: 1,
  size: 10,
});

onMounted(() => {
  hoverContainer = document.querySelector('.hover-container') as HTMLDivElement;
  container = document.querySelector('.container') as HTMLDivElement;
  // 排行榜按钮移入事件
  hoverContainer.addEventListener('mouseenter', () => {
    show.value = true;
  });
  // 排行榜按钮移入事件
  container.addEventListener('mouseleave', () => (show.value = false));
  fetchList();
});

onUnmounted(() => {
  hoverContainer.removeEventListener('mouseenter', () => {});
  container.removeEventListener('mouseleave', () => {});
});

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getSchoolRanking(Object.assign(page.value, { yearId: userStore.getYearId }));
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.container {
  .hover-container {
    width: 10rem;
    height: 5rem;
    border-radius: 0 0 5rem 5rem;
    box-sizing: border-box;
  }
  .content {
    width: 30rem;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
  }
}
</style>
