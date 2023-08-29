<template>
  <div
    class="avatar"
    @click="openSelectFile"
    v-loading="loading"
    element-loading-text="上传中···"
  >
    <div class="mask"></div>
    <img :src="avatarSrc" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { uploadFile } from '@/api/file'
import { updateAvatar } from '@/api/system/user'
import { ElMessage } from 'element-plus'
import default_avatar from '@/assets/image/default_avatar.png'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const loading = ref(false)
const avatarSrc = ref(userStore.userInfo.avatar || default_avatar)
const openSelectFile = async () => {
  loading.value = true
  try {
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: '图片类型',
          accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
        },
      ],
    })
    const file = await fileHandle.getFile()
    const { data: fileRes } = await uploadFile({ file: file })
    const res = await updateAvatar(fileRes.id)
    avatarSrc.value = res.data
    userStore.updateAvatar(res.data)
    ElMessage.success(res.message)
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.avatar {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: white solid 2px;
  overflow: hidden;
  cursor: pointer;

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: none;

    &::after {
      content: '+';
      position: absolute;
      margin-top: 50%;
      margin-left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: white;
      font-weight: 200;
    }
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover .mask {
    display: block;
  }
}
</style>
