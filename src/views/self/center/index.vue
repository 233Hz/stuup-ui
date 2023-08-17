<template>
  <el-card shadow="never" class="m-20">
    <template #header>
      <el-page-header icon="ArrowLeft" @back="router.back()">
        <template #content>
          <span class="text-large font-600 mr-3">个人中心</span>
        </template>
      </el-page-header>
    </template>
    <el-form ref="formRef" :model="form" label-position="top" class="w-800">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          action="/api/file/upload"
          :headers="headers"
          :disabled="loading"
          :show-file-list="false"
          :on-remove="handleUploadRemove"
          :on-success="handleUploadSuccess"
        >
          <div v-if="form.imageUrl" class="avatar">
            <img :src="form.imageUrl" />
          </div>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="原密码" prop="opassword">
        <el-input v-model="form.opassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="npassword">
        <el-input v-model="form.npassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="rpassword">
        <el-input v-model="form.rpassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">修改</el-button>
        <el-button @click="formRef?.resetFields()">重 置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getToken } from '@/utils/auth'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

// REF
const formRef = ref()

// DATA
const loading = ref(false)
const form = ref({
  imageUrl: void 0,
  opassword: void 0,
  npassword: void 0,
  rpassword: void 0,
})

//COMPUTED
const headers = computed(() => {
  return {
    Authorization: getToken(),
  }
})

//METHODS
const submitForm = () => {}
const handleUploadRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handleUploadSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
  uploadFiles,
) => {
  console.log(response)

  // form.value.imageUrl = response.data.url
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  .avatar {
    width: 178px;
    height: 178px;
    display: block;

    > img {
      width: 100%;
      height: 100%;
    }

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
