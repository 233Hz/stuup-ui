<template>
  <div class="contaienr">
    <video :src="video" autoplay muted loop />
    <span class="hint" v-show="show_hint"></span>
    <Leaderboard class="leaderboard" />
    <span class="class-name">{{ className }}</span>
    <span class="bmh_bloom" />
    <span class="bmh_fruit" />
    <span class="bmh-garden" @click="router.push(`/garden/${GARDEN_TYPE.BMH}`)" />
    <span class="xcj_bloom" />
    <span class="xcj_fruit" />
    <span class="xcj-garden" @click="router.push(`/garden/${GARDEN_TYPE.XCJ}`)" />
    <span class="xhh_bloom" />
    <span class="xhh_fruit" />
    <span class="xhh-garden" @click="router.push(`/garden/${GARDEN_TYPE.XHH}`)" />
    <div class="blisters-generate-wrapper" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import video from '@/assets/video/video-background.mp4';
import Leaderboard from '@/components/Leaderboard.vue';
import { GARDEN_TYPE } from '@/utils/dict';
import { useRouter } from 'vue-router';
import { getStudentScore } from '@/api/home';

const router = useRouter();

const show_hint = ref<boolean>(false);
const className = ref<string>('');
const score = ref<number>(200);

let hint: HTMLDivElement;

const flowers = new Map([
  [
    'bmh_fruit',
    `<h3>白梅花</h3>
     <p>异名：绿萼梅</p>
     <p>药用部位：蔷薇科植物梅的花蕾。其根（梅根）、枝（梅梗）、干燥未成熟果实（乌梅）、未成熟果实的盐渍品（白梅）、种仁（梅核仁）亦供药用。</p>
     <p>性味：酸涩，平</p>
     <p>归经：入肝、肺二经</p>
     <p>功效：舒肝，和胃，化痰</p>
     <p>主治：治梅核气，肝胃气痛，食欲不振，头晕，瘰疬</p>
     <p>用法与用量：内服：煎汤或入丸散。外用：敷贴</p>`,
  ],
  [
    'bmh_bloom',
    `<h3>白梅花</h3>
     <p>&nbsp;&nbsp;&nbsp;&nbsp;迎寒早开,美丽脱俗。被誉为花中“四君子”之首，因其所处环境恶劣，却仍在凌厉寒风中傲然绽放于枝头，是中华民族最有骨气的花，是民族魂代表。梅的傲骨激励着一代又一代的中国人不畏艰险、奋勇前进、百折不挠。象征正直、纯洁、坚贞、气节、谦虚的品格。</p>`,
  ],
  [
    'xcj_fruit',
    `<h3>小雏菊</h3>
     <p>雏菊属于菊花的一个类别</p>
     <p>药用菊花包含了：白菊（雏菊）；滁菊；贡菊；杭菊（杭白菊，杭黄菊）</p>
     <p>药用部位：菊科植物菊的头状花序。其根（白菊花根）、嫩茎叶（菊花苗）、叶（菊花叶）亦供药用。</p>
     <p>性味：甘苦；凉</p>
     <p>归经：入肺；肝经</p>
     <p>功效：疏风，清热，明目，解毒</p>
     <p>主治：治头痛，眩晕，目赤，心胸烦热，疔疮，肿毒</p>
     <p>用法与用量：内服；泡茶或入丸散</p>`,
  ],
  [
    'xcj_bloom',
    `<h3>小雏菊</h3>
     <p>&nbsp;&nbsp;&nbsp;&nbsp;盛开在百花凋零之后，隽美多姿，素雅坚贞被称之为“傲霜之花”，受国人爱重，视为高尚情操和坚贞不屈的象征。</p>`,
  ],
  [
    'xhh_fruit',
    `<h3>西红花</h3>
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
  ],
  [
    'xhh_bloom',
    `<h3>西红花</h3>
     <p>&nbsp;&nbsp;&nbsp;&nbsp;象征快乐、挂念、真心、多彩、期望和青春的喜悦`,
  ],
]);

onMounted(() => {
  getUserScore();
  hint = document.querySelector('.hint') as HTMLDivElement;
  const keys = Array.from(flowers.keys()) as string[];
  console.log(keys);

  addShowTipsEvent(...keys);
  // generateBlisters();
});
onUnmounted(() => {});

const addShowTipsEvent = (...args: string[]): void => {
  args.forEach(className => {
    const el = document.querySelector(`.${className}`) as HTMLDivElement;
    el.addEventListener('mouseenter', () => {
      show_hint.value = true;
      hint.innerHTML = flowers.get(className) as string;
      requestAnimationFrame(() => {
        hint.style.left = el.offsetLeft + el.clientWidth / 2 + 'px';
        hint.style.top = el.offsetTop - hint.clientHeight + 'px';
      });
    });
    el.addEventListener('mouseleave', () => {
      show_hint.value = false;
      hint.innerHTML = '';
      hint.style.top = 0 + 'px';
      hint.style.left = 0 + 'px';
    });
  });
};

const generateBlisters = (): void => {
  const wrapper = document.querySelector('.blisters-generate-wrapper') as HTMLDivElement;
  for (let i = 0; i < 10; i++) {
    let blistersEl = document.createElement('div') as HTMLDivElement;
    const score = Math.floor(Math.random() * 10) + 1;
    let textNode = document.createTextNode(`+${score}`);
    blistersEl.setAttribute('score', score.toString());
    blistersEl.append(textNode);
    blistersEl.classList.add('blisters');
    console.log(devicePixelRatio);
    const blistersDiameter: number = 50 / devicePixelRatio;
    blistersEl.style.top = `${
      Math.floor(Math.random() * (wrapper.clientWidth - blistersDiameter)) + blistersDiameter
    }px`;
    blistersEl.style.left = `${
      Math.floor(Math.random() * (wrapper.clientWidth - blistersDiameter)) + blistersDiameter
    }px`;
    const delayTime = Math.floor(Math.random() * 2000);
    blistersEl.style.animationDelay = `${delayTime}ms`;

    wrapper.appendChild(blistersEl);
  }

  wrapper.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('blisters')) {
      target.remove();
    }
  });
};

const getUserScore = async () => {
  const { data } = await getStudentScore();
  if (data !== null) score.value = data;
};
</script>

<style scoped lang="scss">
.contaienr {
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  position: relative;
  background-color: #d5d1c2;
  overflow: hidden;
  user-select: none;

  > video {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16/9;
    z-index: 0;
  }
  .hint {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 30rem;
    line-height: 2rem;
    font-size: 1rem;
    background-color: rgba(136, 134, 127, 0.5);
    padding: 1rem;
    margin: 0;
    border-radius: 16px;
    color: #fff;
    letter-spacing: 0.2rem;
  }

  .leaderboard {
    position: absolute;
    right: 1.4rem;
    top: 0;
  }

  .class-name {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 3rem);
    font-size: 2rem;
    font-family: FZShuTi;
    z-index: 1;
  }

  .bmh_bloom {
    position: absolute;
    top: 20rem;
    left: 0;
    width: 20rem;
    height: 28rem;
  }

  .bmh_fruit {
    position: absolute;
    top: 48rem;
    left: 17rem;
    width: 6rem;
    height: 6rem;
  }

  .bmh-garden {
    position: absolute;
    top: 33rem;
    left: 22rem;
    width: 8rem;
    height: 8rem;
  }

  .xcj_bloom {
    position: absolute;
    top: 22rem;
    left: 66rem;
    width: 20rem;
    height: 18rem;
  }

  .xcj_fruit {
    position: absolute;
    top: 35rem;
    left: 49.5rem;
    width: 6rem;
    height: 6rem;
  }

  .xcj-garden {
    position: absolute;
    top: 25rem;
    left: 55rem;
    width: 8rem;
    height: 8rem;
  }

  .xhh_bloom {
    position: absolute;
    top: 48rem;
    left: 78rem;
    width: 18rem;
    height: 10rem;
  }

  .xhh_fruit {
    position: absolute;
    top: 44.5rem;
    left: 87rem;
    width: 6rem;
    height: 6rem;
  }

  .xhh-garden {
    position: absolute;
    top: 42rem;
    left: 100rem;
    width: 8rem;
    height: 8rem;
  }

  .blisters-generate-wrapper {
    position: absolute;
    top: 48rem;
    left: 26rem;
    width: 20rem;
    height: 15rem;
  }

  .flower-level {
    position: absolute;
    left: 3vw;
    bottom: 8vh;
  }
}
</style>

<style lang="scss">
.blisters {
  position: absolute;
  background-color: #d4ff02;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  color: #1a8e00;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.5), 15px 25px 10px rgba(255, 255, 255, 0.05),
    15px 20px 20px rgba(255, 255, 255, 0.05);
  animation: blisters-show 2s ease forwards;
  opacity: 0;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background: #fff;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0.3rem;
    left: 1rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #fff;
  }

  &:hover {
    transform: scale(1.05);
  }
}

@keyframes blisters-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
