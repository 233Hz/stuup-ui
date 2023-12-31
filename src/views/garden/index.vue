<template>
  <div class="wrapper">
    <el-page-header icon="ArrowLeft" @back="router.back()" class="my-10">
      <template #content>
        <span class="text-large font-600 mr-3">成长花园</span>
      </template>
    </el-page-header>
    <div class="wrapper-content">
      <div class="search">
        <h1>
          <span>{{ GARDEN_TYPE.getKeyForValue(String(route.params.id)) }}</span>
          {{ total }}
          <span>人</span>
        </h1>
        <el-form ref="searchRef" :inline="true" :model="searchForm">
          <el-form-item prop="studentName">
            <el-input v-model="searchForm.studentName" placeholder="学生姓名" />
          </el-form-item>
          <el-form-item prop="className" v-if="!userStore.isStudent">
            <el-input v-model="searchForm.className" placeholder="班级名称" />
          </el-form-item>
          <el-form-item prop="gradeId" v-if="!userStore.isStudent">
            <el-select v-model="searchForm.gradeId" placeholder="请选择年级">
              <el-option
                v-for="item in dictionaryStore.grade"
                :key="item.oid"
                :label="item.gradeName"
                :value="item.oid"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchList">查询</el-button>
            <el-button @click="searchRef?.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-skeleton :rows="10" animated :loading="loading">
        <ul>
          <li class="list-item" v-for="(item, index) in listData">
            <div
              class="list-item-ranking"
              :class="[
                { first: calculateRank(index) === 1 },
                { second: calculateRank(index) === 2 },
                { third: calculateRank(index) === 3 },
              ]"
            >
              {{ calculateRank(index) }}
            </div>
            <div class="list-item-avatar">
              <img :src="item.avatar || defaultAvatar" alt="头像" />
            </div>
            <div class="list-item-content">
              <h4>{{ item.studentName }}</h4>
              <h6>所属年级： {{ item.gradeName }}</h6>
              <p>所属班级： {{ item.className }}</p>
            </div>
            <div class="list-item-score">
              <p>总积分</p>
              <span>{{ item.score }}</span>
            </div>
          </li>
          <el-empty description="没有同学在这个花园" v-show="!hasData" />
        </ul>
        <div class="pagination">
          <el-pagination
            small
            background
            layout="prev, pager, next, jumper"
            v-model:current-page="searchForm.current"
            :total="total"
            style="text-align: center"
            :hide-on-single-page="listData.length === 0"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts" name="Garden">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { getGrowGarden } from '@/api/garden'
import type { GrowGardenVO } from '@/api/garden/type'
import { GARDEN_TYPE } from '@/utils/dict'
import defaultAvatar from '@/assets/icons/default-avatar.svg'
import useUserStore from '@/store/modules/user'
import useDictionaryStore from '@/store/modules/dictionary'

const userStore = useUserStore()
const dictionaryStore = useDictionaryStore()

const route = useRoute()
const router = useRouter()

const searchRef = ref<FormInstance>()

const searchForm = ref({
  current: 1,
  size: 10,
  gardenType: route.params.id,
  studentName: void 0,
  studentNo: void 0,
  className: void 0,
  gradeId: void 0,
})
const total = ref<number>(0)
const listData = ref<GrowGardenVO[]>([])
const loading = ref<boolean>(false)

const hasData = computed(() => {
  return listData.value && listData.value.length
})

onMounted(async () => {
  await fetchList()
  await dictionaryStore.init()
})

const fetchList = async () => {
  loading.value = true

  try {
    const { data } = await getGrowGarden(searchForm.value)
    total.value = data.total
    listData.value = data.records
  } finally {
    loading.value = false
  }
}

const calculateRank = (index: number): number => {
  return (searchForm.value.current - 1) * searchForm.value.size + index + 1
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  margin: 20px;
  border-radius: 4px;

  &-content {
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;

    .search {
      display: flex;
      justify-content: space-between;
      align-items: start;
      border-bottom: var(--border);

      > h1 {
        padding: 4px 10px;
        border-radius: 4px;
        color: #fff;
        background-color: #fcd760;
        font-size: 24px;
        font-weight: bold;
        > span {
          font-size: 16px;
        }
      }
    }

    > ul {
      .list-item {
        display: flex;
        align-items: center;
        padding: 20px 0;
        border-bottom: var(--border);
        user-select: none;

        .first {
          background-color: #ffd453;
        }
        .second {
          background-color: #afdbf0;
        }
        .third {
          background-color: #fddabf;
        }

        &-ranking {
          margin: 20px;
          font-family:
            Helvetica Neue,
            Tahoma,
            Arial,
            PingFangSC-Regular,
            Hiragino Sans GB,
            Microsoft Yahei,
            sans-serif;
          font-size: 16px;
          font-weight: 700;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          border-radius: 8px;
          background-color: #7b859a;
        }

        &-avatar {
          width: 60px;
          height: 60px;

          &:hover {
            cursor: pointer;
          }

          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            -webkit-user-drag: none;
          }
        }

        &-content {
          flex: 1;
          padding-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: end;

          > h4 {
            color: #fb7299;
            font-size: 16px;
            margin-bottom: 10px;

            &:hover {
              cursor: pointer;
            }
          }

          > h6 {
            font-size: 14px;
          }

          > p {
            color: #6d757a;
            font-size: 12px;
            line-height: 20px;
          }
        }

        &-score {
          text-align: center;
          > p {
            margin-bottom: 5px;
          }

          > span {
            padding: 2px 20px;
            border: var(--border);
            border-radius: 4px;
            background-color: #fff0e3;
            color: #ff8f87;
            font-size: 24px;
            font-weight: bolder;
          }
        }
      }
    }

    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
