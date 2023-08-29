<template>
  <div class="absolute t-0 l-0 w-full h-full">
    <div ref="wrapperRef" class="relative t-0 l-0 w-full h-full">
      <div
        ref="tipRef"
        class="absolute t-0 l-0 max-w-800 line-h-40 p-16 text-white fs-24 tracking-widest rounded-lg z-9999"
        style="background-color: rgba(136, 134, 127, 0.5)"
        v-show="show_hint"
      />
      <div class="bmh_bloom absolute l-0 t-300 w-300 h-400" />
      <div class="bmh_fruit absolute l-260 t-770 w-100 h-100" />
      <div
        class="absolute l-330 t-550 w-150 h-150"
        @click="router.push(`/garden/${GARDEN_TYPE.BMH}`)"
      />
      <div class="xcj_bloom absolute l-1100 t-400 w-300 h-260" />
      <div class="xcj_fruit absolute l-790 t-580 w-100 h-100" />
      <div
        class="absolute l-880 t-420 w-150 h-150"
        @click="router.push(`/garden/${GARDEN_TYPE.XCJ}`)"
      />
      <div class="xhh_bloom absolute l-1260 t-750 w-300 h-150" />
      <div class="xhh_fruit absolute l-1430 t-710 w-100 h-100" />
      <div
        class="absolute l-1640 t-670 w-150 h-150"
        @click="router.push(`/garden/${GARDEN_TYPE.XHH}`)"
      />
      <div class="sun" @click="bus.emit('show-rank')">荣誉榜</div>
      <span class="absolute block t-0 r-150">
        <el-link type="danger" icon="CloseBold" @click="handleLogout">
          退出登录
        </el-link>
      </span>
      <!-- 用户信息 and 菜单 -->
      <div class="absolute t-0 l-0 flex">
        <Self />
        <Menu />
      </div>
      <Level class="absolute t-200 l-0" />
      <!-- 用户等级 -->
      <current-level class="absolute b-140 l-460" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GARDEN_TYPE, USER_TYPE } from '@/utils/dict'
import { reqUnCollectScore, reqUpdateRecordState } from '@/api/home/index'
import { UnCollectScore } from '@/api/home/type'
import { flowerHint } from './const'
import { ElMessageBox } from 'element-plus'
import bus from '@/utils/bus'
import useUserStore from '@/store/modules/user'
import Self from './Self/index.vue'
import Menu from './Menu/index.vue'
import Level from './Level/index.vue'
import CurrentLevel from './CurrentLevel/index.vue'

const router = useRouter()
const userStore = useUserStore()

const wrapperRef = ref()
const tipRef = ref()
const show_hint = ref<boolean>(false)
const unCollectScores = ref<UnCollectScore[]>()

onMounted(async () => {
  init()
  if (userStore.userInfo.userType === USER_TYPE.STUDENT) {
    const { data } = await reqUnCollectScore()
    unCollectScores.value = data
    data.forEach((item) => {
      generateBlisters(item.id, item.score)
    })
  }
})

const init = () => {
  Object.keys(flowerHint).forEach((className) => {
    const el = document.querySelector(`.${className}`) as HTMLDivElement
    el.addEventListener('mouseenter', () => {
      show_hint.value = true
      tipRef.value.innerHTML = flowerHint[className] as string
      requestAnimationFrame(() => {
        tipRef.value.style.left = el.offsetLeft + el.clientWidth / 2 + 'px'
        tipRef.value.style.top = el.offsetTop - tipRef.value.clientHeight + 'px'
      })
    })
    el.addEventListener('mouseleave', () => {
      show_hint.value = false
      tipRef.value.innerHTML = ''
      tipRef.value.style.top = 0 + 'px'
      tipRef.value.style.left = 0 + 'px'
    })
  })

  wrapperRef.value.addEventListener('click', async (e: MouseEvent) => {
    const target = e.target as HTMLDivElement
    if (target.classList.contains('drop')) {
      const elements = document.querySelectorAll('.drop')
      elements.forEach((element) => {
        element.remove()
      })
      // 更新分数
      const totalScore = unCollectScores.value?.reduce(
        (accumulator, item) => accumulator + item.score,
        0,
      )
      // 更新仓库总分
      totalScore && userStore.updateTotalScore(totalScore)
      // 更新记录状态
      const idArr = unCollectScores.value?.map((item) => item.id)
      const idStr = idArr?.join(',')
      await reqUpdateRecordState(idStr!)
      // 通知显示升级动画
      bus.emit('collect-drop', userStore.userInfo.totalScore)
    }
  })
}

const generateBlisters = (key: number | string, score: number): void => {
  const size: number = 60
  let dropElement = document.createElement('div') as HTMLDivElement
  let textNode = document.createTextNode(`+${score}`)
  dropElement.setAttribute('key', key.toString())
  dropElement.setAttribute('score', score.toString())
  dropElement.append(textNode)
  dropElement.style.position = 'absolute'
  dropElement.style.width = `${size}px`
  dropElement.style.height = `${size}px`
  dropElement.style.borderRadius = '50%'
  dropElement.style.boxShadow = `inset 5px 5px 5px rgba(0, 0, 0, 0.05),
    15px 25px 10px rgba(0, 0, 0, 0.1),
    15px 20px 20px rgba(0, 0, 0, 0.05),
    inset -5px -5px 10px rgba(255, 255, 255, 0.5)`
  dropElement.style.backgroundColor = '#19c975'
  dropElement.style.color = '#ccff5a'
  dropElement.style.lineHeight = `${size}px`
  dropElement.style.textAlign = 'center'
  dropElement.style.fontSize = '24px'
  dropElement.style.cursor = 'pointer'
  dropElement.style.top =
    Math.floor(Math.random() * (1080 / 2 - size * 2)) + 1080 / 2 + size + 'px'
  dropElement.style.left =
    Math.floor(Math.random() * (1920 - size * 2)) + size + 'px'
  dropElement.classList.add('drop')
  wrapperRef.value.appendChild(dropElement)
}

const handleLogout = () => {
  ElMessageBox.confirm('确认退出？', '退出登入', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await userStore.userLogout()
      window.location.reload()
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.sun {
  position: absolute;
  right: -30px;
  top: -20px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 150px;
  background-color: #f4b632;
  background-image: linear-gradient(0deg, #f4b632 0%, #f45232 50%);
  font-size: 32px;
  font-family: 华文行楷;

  &:hover {
    cursor: pointer;
    font-size: 34px;
  }
}

.drop {
  &:hover {
    transform: scale(1.05);
  }
}
</style>
