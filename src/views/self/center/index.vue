<template>
  <el-card shadow="never" class="m-20">
    <template #header>
      <el-page-header icon="ArrowLeft" @back="router.back()">
        <template #content>
          <span class="text-large font-600 mr-3">个人中心</span>
        </template>
      </el-page-header>
    </template>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="w-800"
      :disabled="loading"
    >
      <el-form-item label="用户头像">
        <UploadAvatar />
      </el-form-item>
      <el-form-item label="原密码" prop="opassword">
        <el-input
          v-model="form.opassword"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item label="新密码" prop="npassword">
        <el-input
          v-model="form.npassword"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rpassword">
        <el-input
          v-model="form.rpassword"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          <el-icon
            :class="loading ? 'is-loading el-icon--left' : 'el-icon--left'"
          >
            <Loading v-show="loading" />
            <Edit v-show="!loading" />
          </el-icon>
          修改
        </el-button>
        <el-button :icon="RefreshLeft" @click="formRef?.resetFields()">
          重 置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Loading, Edit, RefreshLeft } from '@element-plus/icons-vue'
import { updatePassword } from '@/api/system/user'
import useUserStore from '@/store/modules/user'
import { passwordRegex } from '@/utils/regex'

const validateRpassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== form.value.npassword) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}

const router = useRouter()
const userStore = useUserStore()

const formRef = ref()

const rules = {
  opassword: {
    required: true,
    message: '请输入原密码',
    trigger: 'blur',
  },
  npassword: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'blur',
    },
    {
      pattern: passwordRegex,
      message: '密码必须包括字母大小写、数字、特殊字符',
      trigger: 'blur',
    },
  ],
  rpassword: {
    required: true,
    validator: validateRpassword,
    trigger: 'blur',
  },
}

const loading = ref(false)
const form = ref<any>({
  opassword: void 0,
  npassword: void 0,
  rpassword: void 0,
})

const submitForm = async () => {
  await formRef.value.validate()
  loading.value = true
  try {
    const res = await updatePassword(form.value)
    ElMessage.success(res.msg)
    await userStore.userLogout()
    ElMessage.warning('密码已修改，请重新登录')
  } catch (error) {
    formRef.value.resetFields()
  } finally {
    loading.value = false
  }
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
