<template>
  <div class="login-container">
    <section class="login-header">
      <img :src="logo" />
      <span>学生成长百草园</span>
    </section>
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

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'
import useFlowersStore from '@/store/modules/flowers'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import logo from '@/assets/image/logo.png'

const userStore = useUserStore()
const flowersStore = useFlowersStore()
const $route = useRoute()
const $router = useRouter()

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
    await userStore.userLogin(form.value)
    // 初始化花朵兑换信息
    await flowersStore.getFlowers()
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElMessage.success('登录成功')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    font-size: 32px;
    font-weight: bold;

    > img {
      width: 200px;
      height: 100%;
      margin-left: 20%;
      margin-right: 20px;
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
