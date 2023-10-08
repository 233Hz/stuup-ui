<template>
  <div class="login-container">
    <div class="logo" v-if="setting.showLogo">
      <div class="picture">
        <img src="/logo.png" alt="logo" />
      </div>
      <div class="title">{{ title }}</div>
    </div>
    <section class="login-content">
      <div class="login-image">
        <svg-icon name="login-icon" width="600px" height="300px" />
      </div>
      <div class="login-wrapper">
        <div class="login-form">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="top"
            size="large"
          >
            <el-form-item label="用户名" prop="loginName">
              <el-input v-model="form.loginName" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" show-password />
            </el-form-item>
            <el-form-item action>
              <el-button
                type="success"
                style="width: 100%"
                :loading="loading"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
    <section class="login-footer">
      Copyright &copy;2017 泼猴信息技术(上海)有限公司AIl Rights Reserved
    </section>
  </div>
</template>

<script setup lang="ts" name="Login">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import setting from '@/setting'

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const formRef = ref()
const loading = ref<boolean>(false)

const form = ref({
  loginName: '',
  password: '',
})

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
  },
  password: {
    required: true,
    message: '请输入密码',
  },
}

const handleLogin = async () => {
  await formRef.value.validate()
  try {
    loading.value = true
    const data = await userStore.userLogin(form.value)
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/home' })
    ElMessage.success(data.msg)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
$logo-picture-weith: 161px;
$logo-picture-height: 99px;

.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    height: var(--header-height);
    display: flex;

    .picture {
      width: 80px;
      height: 100%;
      display: flex;

      > img {
        width: math.div($logo-picture-weith, 3);
        height: math.div($logo-picture-height, 3);
        margin: auto;
        object-fit: cover;
      }
    }
    .title {
      flex: 1;
      height: 100%;
      font-size: 24px;
      font-weight: 600;
      line-height: var(--header-height);
    }
  }

  .login-content {
    width: 100%;
    height: 600px;
    background-color: var(--base-color);
    display: flex;
    justify-content: center;
    align-items: center;

    .login-image {
      width: 600px;
      height: 300px;
      margin-right: 200px;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .login-wrapper {
      width: 400px;
      height: 400px;
      border: 1px solid #eee;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 0 20px;
      background: rgba(255, 242, 242, 0.644);
      backdrop-filter: saturate(180%) blur(20px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 200px;

      > h2 {
        height: 2rem;
        line-height: 2rem;
        text-align: center;
      }

      &-form {
        padding: 20px;
      }
    }
  }

  .login-footer {
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
}
</style>
