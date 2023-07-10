<template>
  <div class="bunga-header">
    <div class="bunga-header__logo">
      <img :src="logo" width="200" />
    </div>
    <div class="bunga-header__menu">
      <Menu style="height: 100%" v-show="!showAside" mode="horizontal" :routes="premissionStore.getFrontAsideRouters" />
    </div>
    <div class="bunga-header__navbar">
      <el-space>
        <el-button type="primary" :icon="ArrowRightBold" round @click="router.push('/')">前往后台</el-button>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userStore.getUserName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/self/center')">个人中心</el-dropdown-item>
              <el-dropdown-item @click="router.push('/self/notify')">我的消息</el-dropdown-item>
              <el-dropdown-item @click="handleLoginout">退出登入</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import logo from '@/assets/logo.png';
import Menu from './Menu.vue';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/premission';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import { USER_TYPE } from '@/utils/dict';

const router = useRouter();
const userStore = useUserStore();
const premissionStore = usePermissionStore();

const showAside = ref<boolean>(false);

const emit = defineEmits(['change-aside']);

onMounted(() => {
  showAside.value = sessionStorage.getItem('show-aside') === 'true';
  emit('change-aside', showAside.value);
});

const hiddenBackBtn = computed(() => {
  return userStore.getUserType === USER_TYPE.TEACHER;
});

watch(showAside, newVal => {
  // newVal ? router.push('/dashboard') : router.push('/');
  sessionStorage.setItem('show-aside', newVal.toString());
  emit('change-aside', newVal);
});

// const backHome = () => {
//   showAside.value = !showAside.value;
//   showAside.value ? router.push('/dashboard') : router.push('/');
//   sessionStorage.setItem('show-aside', showAside.value.toString());
//   emit('change-aside', showAside.value);
// };

const handleLoginout = () => {
  ElMessageBox.confirm('确认退出？', '退出登入', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      userStore.loginOut().then(() => {
        router.push('/login');
      });
    })
    .catch(() => {});
};
</script>

<style scoped lang="scss">
@include b(header) {
  height: var(--header-height);
  display: flex;
  background-color: var(--aside-menu-background);
  @include e(logo) {
    width: var(--aside-width);
    display: flex;
    > img {
      width: 90%;
      margin: auto;
    }
  }
  @include e(menu) {
    flex: 1;
    height: 100%;
  }
  @include e(navbar) {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: end;
  }
}
</style>
