<template>
  <div class="details">
    <div class="header">
      <el-page-header :icon="ArrowLeft" @back="router.back()">
        <template #content>
          <span class="text-large font-600 mr-3">我的成长明细</span>
        </template>
      </el-page-header>
      <div class="score">
        <div class="score-wrapper">
          <div class="content">
            <p class="total-text">当前总积分</p>
            <h1 class="total-score">
              {{ totalScore }}
              <span class="fs-24">分</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="tableData"
            :width="width"
            :height="height"
            :row-height="100"
            row-class="fs-18 font-bold"
            row-key="id"
            fixed
            @end-reached="onEndReachedHandle"
          >
            <template #footer>
              <div class="text-center fs-20 bg-#f7f7f7">
                <span v-show="loading">
                  <el-icon class="is-loading" size="30">
                    <Loading />
                  </el-icon>
                  加载更多中
                </span>
                <span v-if="!loading && !hasData">没有更多了</span>
              </div>
            </template>
          </el-table-v2>
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { studentScoreDetails } from '@/api/details'
import { formatDate } from '@/utils/util'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { Column } from 'element-plus'

const router = useRouter()

const page = ref({
  current: 1,
  size: 20,
})
const loading = ref(false)
const totalScore = ref(0)
const tableData = ref<any[]>([])
const hasData = ref(true)

const columns: Column[] = [
  {
    key: 'name',
    dataKey: 'name',
    title: '项目名称',
    width: 900,
    cellRenderer: ({ rowData }) => (
      <div>
        <p>{rowData.name}</p>
        {rowData.description ? (
          <p class="fs-14 text-#969696 mt-10">{rowData.description}</p>
        ) : null}
      </div>
    ),
  },
  {
    align: 'center',
    key: 'score',
    dataKey: 'score',
    title: '获得分数',
    width: 100,
  },
  {
    align: 'center',
    key: 'createTime',
    dataKey: 'createTime',
    title: '获得时间',
    width: 200,
    cellRenderer: ({ cellData }) => (
      <span>{formatDate(cellData, 'YYYY-MM-DD')}</span>
    ),
  },
]

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    loading.value = true
    const {
      data: { totalScore: score, records },
    } = await studentScoreDetails(page.value)
    totalScore.value = score
    if (records.length < page.value.size) {
      hasData.value = false
    }
    records.forEach((item) => {
      item.score = Number(item.score) > 0 ? '+' + item.score : item.score
      tableData.value.push(item)
    })
  } finally {
    loading.value = false
  }
}

const onEndReachedHandle = () => {
  if (!hasData.value) return
  page.value.current++
  fetchData()
}
</script>

<style scoped lang="scss">
.details {
  width: 1200px;
  height: 100%;
  margin: auto;
  position: relative;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;

  .header {
    background-color: #8bc6ec;
    background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);

    .score {
      width: 100%;
      height: 300px;
      padding: 20px;

      &-wrapper {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
          .total-text,
          .total-score {
            text-align: center;
          }

          .total-text {
            font-size: 24px;
          }

          .total-score {
            font-size: 48px;
            font-weight: bold;
            margin-top: 30px;
          }
        }
      }
    }
  }

  .main {
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: red;
  }
}
</style>
