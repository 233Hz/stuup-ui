<template>
  <el-card class="m-20">
    <el-button type="success" @click="handleTask(1)">
      计算积分（每天）
    </el-button>
    <el-button type="success" @click="handleTask(2)">
      计算积分（每周）
    </el-button>
    <el-button type="success" @click="handleTask(3)">
      计算积分（每月）
    </el-button>
    <el-button type="success" @click="handleTask(4)">
      计算期积分（每学期）
    </el-button>
    <el-button type="success" @click="handleTask(5)">
      计算积分（每年）
    </el-button>
    <el-button type="success" @click="handleTask(6)">
      生成当前学年和学期
    </el-button>
    <el-button type="success" @click="handleTask(7)">
      成长计算每日定时补偿
    </el-button>
    <el-button type="success" @click="handleTask(8)">
      自动采集未收集的水滴
    </el-button>
  </el-card>
</template>

<script setup lang="ts">
import { manualTask } from '@/api/grow/config'
import { ElMessage } from 'element-plus'

const handleTask = async (num: number) => {
  try {
    await manualTask(num)
    ElMessage.success('执行成功')
  } catch {
    ElMessage.error('执行失败')
  }
}
</script>
