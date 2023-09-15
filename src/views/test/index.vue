<template>
  <el-card class="m-20">
    <el-button type="warning" @click="handleTask(1)">
      计算每天积分（测试）
    </el-button>
    <el-button type="warning" @click="handleTask(2)">
      计算每周积分（测试）
    </el-button>
    <el-button type="warning" @click="handleTask(3)">
      计算每月积分（测试）
    </el-button>
    <el-button type="warning" @click="handleTask(4)">
      计算每学期积分（测试）
    </el-button>
    <el-button type="warning" @click="handleTask(5)">
      计算每年积分（测试）
    </el-button>
    <el-button type="warning" @click="handleTask(6)">
      生成当前学年和学期
    </el-button>
    <el-button type="warning" @click="handleTask(7)">
      统计本月榜单数据
    </el-button>
    <el-button type="warning" @click="handleTask(8)">
      统计学年榜单数据
    </el-button>
    <el-button type="warning" @click="handleTask(9)">
      统计学期榜单数据
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
