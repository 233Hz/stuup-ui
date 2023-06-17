<template>
  <div class="login-container">
    <section class="login-header">
      <div class="login-header-logo" />
      <!-- <div>学生成长百草园</div> -->
    </section>
    <section class="login-content">
      <div class="login-image">
        <img :src="bgSrc" />
      </div>
      <div class="login-wrapper">
        <div class="login-form">
          <el-form :model="form" :rules="rules" label-position="top" size="large">
            <el-form-item label="用户名" prop="loginName">
              <el-input v-model="form.loginName" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" show-password />
            </el-form-item>
            <el-form-item action>
              <el-button type="success" style="width: 100%" :loading="loading" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { LoginForm, login } from '@/api/login/index';
import { useRouter } from 'vue-router';
import { setToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import bgSrc from '@/assets/svg/login_background.svg';

const userStore = useUserStore();
const router = useRouter();

const loading = ref<boolean>(false);

const form = reactive<LoginForm>({
  loginName: '',
  password: '',
});

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
  },
  password: {
    required: true,
    message: '请输入密码',
  },
};

const handleLogin = async () => {
  try {
    loading.value = true;
    const res = await login(form);
    setToken(res.token as string);
    userStore.setUserInfo(res.data);
    sessionStorage.setItem('user_info', JSON.stringify(res.data));
    router.push('/');
    ElMessage.success('登录成功');
  } catch {
    form.password = '';
  } finally {
    loading.value = false;
  }
};
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
    height: 40px;
    display: flex;
    align-items: center;

    &-logo {
      height: 60px;
      height: 100%;
      background: url(../../assets/logo.png) no-repeat;
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
}
</style>
