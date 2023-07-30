<template>
  <div class="absolute t-0 l-0 w-full h-full">
    <div class="relative t-0 l-0 w-full h-full">
      <div
        ref="tipRef"
        class="absolute t-0 l-0 max-w-500 p-16 text-white fs-24 tracking-widest rounded-lg z-9999"
        style="background-color: rgba(136, 134, 127, 0.5)"
        v-show="show_hint"></div>
      <div class="bmh_bloom absolute l-0 t-300 w-300 h-400" />
      <div class="bmh_fruit absolute l-260 t-770 w-100 h-100" />
      <div class="absolute l-330 t-550 w-150 h-150" @click="router.push(`/garden/${GARDEN_TYPE.BMH}`)" />
      <div class="xcj_bloom absolute l-1100 t-400 w-300 h-260" />
      <div class="xcj_fruit absolute l-790 t-580 w-100 h-100" />
      <div class="absolute l-880 t-420 w-150 h-150" @click="router.push(`/garden/${GARDEN_TYPE.XCJ}`)" />
      <div class="xhh_bloom absolute l-1260 t-750 w-300 h-150" />
      <div class="xhh_fruit absolute l-1430 t-710 w-100 h-100" />
      <div class="absolute l-1640 t-670 w-150 h-150" @click="router.push(`/garden/${GARDEN_TYPE.XHH}`)" />
      <div class="sun">荣誉榜</div>
      <!-- 用户头像&等级 -->
      <div class="user absolute t-0 l-0 w-500">
        <div class="user-self relative w-full h-200 user-info-border">
          <div class="relative w-full h-full flex user-info-bg">
            <div class="w-100">
              <img :src="defaultAvatar" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 flex">
              <div class="flex-1 m-auto">
                <div class="absolute b-20">
                  <p class="fs-24 font-bold" style="color: #e0cc45">张三</p>
                  <p class="text-white">
                    <span class="fs-18">全校排名:</span>
                    <span class="fs-28">1111</span>
                  </p>
                </div>
              </div>
              <div class="flex-1 flex">
                <div class="m-auto">
                  <p class="text-center text-white fs-24">总积分</p>
                  <h1 class="text-center fs-36 italic total-score-text">10000</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="w-120 h-120 rounded-full overflow-hidden p-10 level-item"
            v-for="(item, index) in conversionFlower.calculateConversionFlower(57)"
            :key="index">
            <img :src="item.imageSrc" class="w-full h-full object-cover rounded-full" style="-webkit-user-drag: none" />
          </div>
        </div>
      </div>
      <!-- 菜单 -->
      <span class="absolute t-30 l-500 w-500">
        <ul class="relative flex flex-wrap">
          <li
            class="w-80 mx-10 cursor-pointer fs-12"
            v-for="(item, index) in menus"
            :key="index"
            @click="item.path ? router.push(item.path) : ''">
            <div class="w-full h-80 p-10">
              <img :src="item.icon" class="w-full h-full object-cover" />
            </div>
            <p class="text-center" style="color: #19c975">{{ item.name }}</p>
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { GARDEN_TYPE } from '@/utils/dict';
import defaultAvatar from '@/assets/image/default_avatar.png';
import applaySvg from '@/assets/svg/home-applay.svg';
import detailsSvg from '@/assets/svg/home-score.svg';
import portraitSvg from '@/assets/svg/home-portrait.svg';
import reportSvg from '@/assets/svg/home-report.svg';
import backSvg from '@/assets/svg/home-back.svg';
import { useConversionFlower } from '@/utils/conversionFlower';

const router = useRouter();
const conversionFlower = useConversionFlower();

const tipRef = ref();
const show_hint = ref<boolean>(false);
const flowerHint: Record<string, string> = {
  bmh_fruit: `<h3>白梅花</h3>
     <p>异名：绿萼梅</p>
     <p>药用部位：蔷薇科植物梅的花蕾。其根（梅根）、枝（梅梗）、干燥未成熟果实（乌梅）、未成熟果实的盐渍品（白梅）、种仁（梅核仁）亦供药用。</p>
     <p>性味：酸涩，平</p>
     <p>归经：入肝、肺二经</p>
     <p>功效：舒肝，和胃，化痰</p>
     <p>主治：治梅核气，肝胃气痛，食欲不振，头晕，瘰疬</p>
     <p>用法与用量：内服：煎汤或入丸散。外用：敷贴</p>`,
  bmh_bloom: `<h3>白梅花</h3>
     <p>&nbsp;&nbsp;&nbsp;&nbsp;迎寒早开,美丽脱俗。被誉为花中“四君子”之首，因其所处环境恶劣，却仍在凌厉寒风中傲然绽放于枝头，是中华民族最有骨气的花，是民族魂代表。梅的傲骨激励着一代又一代的中国人不畏艰险、奋勇前进、百折不挠。象征正直、纯洁、坚贞、气节、谦虚的品格。</p>`,
  xcj_fruit: `<h3>小雏菊</h3>
     <p>雏菊属于菊花的一个类别</p>
     <p>药用菊花包含了：白菊（雏菊）；滁菊；贡菊；杭菊（杭白菊，杭黄菊）</p>
     <p>药用部位：菊科植物菊的头状花序。其根（白菊花根）、嫩茎叶（菊花苗）、叶（菊花叶）亦供药用。</p>
     <p>性味：甘苦；凉</p>
     <p>归经：入肺；肝经</p>
     <p>功效：疏风，清热，明目，解毒</p>
     <p>主治：治头痛，眩晕，目赤，心胸烦热，疔疮，肿毒</p>
     <p>用法与用量：内服；泡茶或入丸散</p>`,
  xcj_bloom: `<h3>小雏菊</h3>
     <p>&nbsp;&nbsp;&nbsp;&nbsp;盛开在百花凋零之后，隽美多姿，素雅坚贞被称之为“傲霜之花”，受国人爱重，视为高尚情操和坚贞不屈的象征。</p>`,
  xhh_fruit: `<h3>西红花</h3>
     <p>药用部位：鸢尾科植物番红花花柱的上部及柱头</p>
     <p>又称“女人花”分布在南欧各国及伊朗等地，上海崇明岛成功引种。</p>
     <p>是最名贵的香料及色素。零售价：50元/克</p>
     <p>性味：甘，平</p>
     <p>归经：入心、肝经</p>
     <p>功效：活血化瘀，散瘀开结</p>
     <p>主治：治忧思郁结，胸膈痞闷，吐血，伤寒发狂，惊怖恍惚，妇女经闭，产后瘀血腹痛，跌扑肿痛</p>
     <p>用法用量：内服：煎汤</p>
     <p>保健用法：泡茶：每天5-7根</p>
     <p>保健用法：泡茶：每天5-7根</p>`,
  xhh_bloom: `<h3>西红花</h3>
     <p>&nbsp;&nbsp;&nbsp;&nbsp;象征快乐、挂念、真心、多彩、期望和青春的喜悦`,
};

const menus = [
  {
    name: '我的积分申请',
    icon: applaySvg,
    path: null,
  },
  {
    name: '我的积分明细',
    icon: detailsSvg,
    path: null,
  },
  {
    name: '我的成长画像',
    icon: portraitSvg,
    path: '/portrait',
  },
  {
    name: '我的成长报告',
    icon: reportSvg,
    path: '/growthReport',
  },
  {
    name: '后台管理',
    icon: backSvg,
    path: '/dashboard',
  },
];

onMounted(() => {
  registerFlowerHint();
});

const registerFlowerHint = () => {
  Object.keys(flowerHint).forEach(className => {
    const el = document.querySelector(`.${className}`) as HTMLDivElement;
    el.addEventListener('mouseenter', () => {
      show_hint.value = true;
      tipRef.value.innerHTML = flowerHint[className] as string;
      requestAnimationFrame(() => {
        tipRef.value.style.left = el.offsetLeft + el.clientWidth / 2 + 'px';
        tipRef.value.style.top = el.offsetTop - tipRef.value.clientHeight + 'px';
      });
    });
    el.addEventListener('mouseleave', () => {
      show_hint.value = false;
      tipRef.value.innerHTML = '';
      tipRef.value.style.top = 0 + 'px';
      tipRef.value.style.left = 0 + 'px';
    });
  });
};

const turntableRef = ref();
const generateBlisters = (): void => {
  const wrapper = document.querySelector('.home-wrapper__blisters') as HTMLDivElement;
  const wrapperRect = wrapper.getBoundingClientRect();
  const blistersDiameter: number = 50;
  for (let i = 0; i < 10; i++) {
    let blistersEl = document.createElement('div') as HTMLDivElement;
    const score = Math.floor(Math.random() * 3) + 1;
    let textNode = document.createTextNode(`+${score}`);
    blistersEl.setAttribute('score', score.toString());
    blistersEl.append(textNode);
    blistersEl.classList.add('blisters');
    blistersEl.style.left = `${Math.floor(
      Math.random() * (wrapperRect.width - blistersDiameter) + blistersDiameter
    )}px`;
    blistersEl.style.top = `${Math.floor(
      Math.random() * (wrapperRect.height - blistersDiameter) + blistersDiameter
    )}px`;
    console.log(blistersEl.style.left + '+' + blistersEl.style.top);
    wrapper.appendChild(blistersEl);
  }

  wrapper.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('blisters')) {
      const elements = document.querySelectorAll('.blisters');
      elements.forEach(element => element.remove());
      turntableRef.value.playAnimate();
    }
  });
};
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

.user-info-border {
  border-width: 50px;
  border-style: solid;
  border-image: url(src/assets/image/user-self-border.png);
  border-image-slice: 200 400;
  border-image-repeat: no-repeat;
}

.user-info-bg {
  background-color: #16a085;
  background-image: linear-gradient(90deg, #16a085 0%, #f4d03f 100%);
  border-radius: 8px;
}

.total-score-text {
  background-color: #fa8bff;
  background-image: linear-gradient(45deg, #fa8bff 0%, #2bd2ff 52%, #2bff88 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.level-item {
  background: linear-gradient(60deg, #16a085, #f4d03f, #16a085, #f4d03f, #5073b8, #1098ad, #07b39b, #6fba82);
  background-size: 300% 300%;
  animation: animatedgradient 3s ease alternate infinite;

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
