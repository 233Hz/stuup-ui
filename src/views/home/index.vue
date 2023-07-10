<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="home-wrapper__bg" />
      <div class="home-wrapper__animation">
        <div class="bmh-bloom">
          <div class="anim" />
        </div>
        <div class="butterfly">
          <div class="anim" />
        </div>
        <div class="squirrel">
          <div class="anim" />
        </div>
        <div class="bird-1">
          <div class="anim" />
        </div>
        <div class="bird-2">
          <div class="anim" />
        </div>
        <div class="chicken">
          <div class="anim" />
        </div>
      </div>
      <div class="home-wrapper__interaction">
        <div class="flower_hint" v-show="show_hint"></div>
        <div class="bmh_bloom_hint" />
        <div class="bmh_fruit" />
        <div class="bmh_garden" @click="router.push(`/garden/${GARDEN_TYPE.BMH}`)" />
        <div class="xcj_bloom" />
        <div class="xcj_fruit" />
        <div class="xcj_garden" @click="router.push(`/garden/${GARDEN_TYPE.XCJ}`)" />
        <div class="xhh_bloom" />
        <div class="xhh_fruit" />
        <div class="xhh_garden" @click="router.push(`/garden/${GARDEN_TYPE.XHH}`)" />
        <div class="sun" @click="rankRef.open">荣誉榜</div>
        <div class="user">
          <div class="user-self">
            <div class="user-self__wrapper">
              <div class="user-avatar">
                <div class="user-avatar__wrapper">
                  <img :src="defaultAvatar" />
                </div>
              </div>
              <div class="user-info">
                <div class="user-info__wrapper">
                  <div class="user-name">张三</div>
                  <div class="user-rank">
                    全校排名
                    <span>1111</span>
                  </div>
                </div>
              </div>
              <div class="user-score">
                <span>总积分</span>
                <span>100</span>
              </div>
            </div>
          </div>
          <div class="user-level">
            <div class="user-level__wrapper">
              <div class="level-icon">
                <div
                  class="level-icon__item"
                  v-for="(item, index) in conversionFlower.calculateConversionFlower(57)"
                  :key="index">
                  <img :src="item.imageSrc" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu">
          <ul class="menu-wrapper">
            <li class="menu-wrapper__item">
              <div class="item-icon">
                <img :src="applaySvg" />
              </div>
              <div class="item-name">我的积分申请</div>
            </li>
            <li class="menu-wrapper__item">
              <div class="item-icon">
                <img :src="detailsSvg" />
              </div>
              <div class="item-name">我的积分明细</div>
            </li>
            <li class="menu-wrapper__item" @click="router.push('/portrait')">
              <div class="item-icon">
                <img :src="portraitSvg" />
              </div>
              <div class="item-name">我的成长画像</div>
            </li>
            <li class="menu-wrapper__item">
              <div class="item-icon">
                <img :src="reportSvg" />
              </div>
              <div class="item-name">我的成长报告</div>
            </li>
            <li class="menu-wrapper__item" @click="router.push('/dashboard')">
              <div class="item-icon">
                <img :src="backSvg" />
              </div>
              <div class="item-name">后台管理</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="home-wrapper__blisters"></div>
      <Turntable ref="turntableRef" class="home-wrapper__turntable" />
      <Rank ref="rankRef" class="home-wrapper__rank" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { GARDEN_TYPE } from '@/utils/dict';
import Rank from './components/Rank/index.vue';
import Turntable from './components/Turntable/index.vue';
import defaultAvatar from '@/assets/image/default_avatar.png';
import applaySvg from '@/assets/svg/home-applay.svg';
import detailsSvg from '@/assets/svg/home-score.svg';
import portraitSvg from '@/assets/svg/home-portrait.svg';
import reportSvg from '@/assets/svg/home-report.svg';
import backSvg from '@/assets/svg/home-back.svg';
import { useConversionFlower } from '@/utils/conversionFlower';

//REF
const turntableRef = ref();
const rankRef = ref();

const router = useRouter();
const conversionFlower = useConversionFlower();
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
  bmh_bloom_hint: `<h3>白梅花</h3>
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

onMounted(() => {
  resetSize();
  registerFlowerHint();
  generateBlisters();
});

const width = 1920;
const height = 1080;

const resetSize = () => {
  const { innerWidth, innerHeight } = window;
  const content = document.querySelector('.home-wrapper') as HTMLDivElement;
  console.log(innerWidth, innerHeight);

  if (innerWidth > innerHeight && innerWidth / innerHeight > 16 / 9) {
    content.style.transform = `scale(${innerHeight / height})`;
  } else {
    content.style.transform = `scale(${innerWidth / width})`;
  }
};
window.onresize = () => {
  resetSize();
};
const registerFlowerHint = (): void => {
  const hintEl = document.querySelector('.flower_hint') as HTMLDivElement;
  Object.keys(flowerHint).forEach(className => {
    const el = document.querySelector(`.${className}`) as HTMLDivElement;
    el.addEventListener('mouseenter', () => {
      show_hint.value = true;
      hintEl.innerHTML = flowerHint[className] as string;
      requestAnimationFrame(() => {
        hintEl.style.left = el.offsetLeft + el.clientWidth / 2 + 'px';
        hintEl.style.top = el.offsetTop - hintEl.clientHeight + 'px';
      });
    });
    el.addEventListener('mouseleave', () => {
      show_hint.value = false;
      hintEl.innerHTML = '';
      hintEl.style.top = 0 + 'px';
      hintEl.style.left = 0 + 'px';
    });
  });
};

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
      elements.forEach(element => {
        element.remove();
      });
    }
  });
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background-color: #d5d1c2;
  display: flex;
  justify-content: center;
  align-items: center;

  .bd {
    border: red solid 4px;
  }

  &-wrapper {
    min-width: 1920px;
    min-height: 1080px;
    width: 1920px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    user-select: none;

    &__bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: url(../../assets/image/home_bg.png) no-repeat center 0;
      background-size: 100% 100%;
      z-index: 0;
    }

    &__animation {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;

      .bmh-bloom {
        position: absolute;
        left: -50px;
        top: 300px;
        width: 400px;
        height: 400px;

        .anim {
          width: 100%;
          height: 100%;
          background: url(../../assets/image/bmh_bloom.png) no-repeat 0 0;
          background-size: 100% 100%;
          animation: 3s bmh_anim infinite alternate-reverse;
          transform-origin: left bottom;
        }

        @keyframes bmh_anim {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(10deg);
          }
        }
      }
      .butterfly {
        position: absolute;
        top: 300px;
        left: 1000px;
        width: 150px;
        height: 150px;
        transform: scale(0.8);

        .anim {
          width: 100%;
          height: 100%;
          background: url(../../assets/image/butterfly_anim.png) no-repeat 0 0;
          animation: butterfly_anim 0.6s steps(8, end) infinite;
        }

        @keyframes butterfly_anim {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -1200px 0;
          }
        }
      }
      .squirrel {
        position: absolute;
        top: 300px;
        right: 100px;
        width: 306px;
        height: 306px;
        transform: scale(0.3);
        .anim {
          width: 100%;
          height: 100%;
          background: url(../../assets/image/squirrel_anim.png) no-repeat 0 0;
          animation: squirrel_anim 4s steps(8, end) infinite;
        }

        @keyframes squirrel_anim {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -2448px 0;
          }
        }
      }
      .bird-1 {
        position: absolute;
        top: -300px;
        left: 0;
        width: 1304px;
        height: 960px;
        transform: scale(0.1);
        animation: bird_1_anim_2 10s infinite;
        .anim {
          width: 100%;
          height: 100%;
          background: url(../../assets/image/bird_1_anim.png) no-repeat 0 0;
          animation: bird_1_anim_1 1s steps(8, end) infinite, bird_1_anim_2 1s infinite;
        }

        @keyframes bird_1_anim_1 {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 -7682px;
          }
        }

        @keyframes bird_1_anim_2 {
          0% {
            left: -1000px;
          }
          100% {
            left: 2000px;
          }
        }
      }
      .bird-2 {
        position: absolute;
        top: 405px;
        left: 260px;
        width: 200px;
        height: 200px;
        transform: scale(0.4);
        .anim {
          width: 100%;
          height: 100%;
          background: url(../../assets/image/bird_2_anim.png) no-repeat 0 0;
          animation: bird-2_anim 4s steps(12, end) infinite;
        }

        @keyframes bird-2_anim {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -2400px 0;
          }
        }
      }
      .chicken {
        position: absolute;
        top: 800px;
        left: 1000px;
        width: 160px;
        height: 160px;
        transform: scale(0.5);
        .anim {
          width: 100%;
          height: 100%;
          background: url(../../assets/image/chicken_anim.png) no-repeat 0 0;
          animation: chicken_anim 4s steps(16, end) infinite;
        }

        @keyframes chicken_anim {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -2560px 0;
          }
        }
      }
    }

    &__interaction {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      z-index: 20;

      .user-level {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        .box {
          position: relative;
          width: 150px;
          height: 150px;
          line-height: 400px;
          overflow: hidden;
          padding: 20px;
          user-select: none;
          margin: 5px;
          box-shadow: 0 20px 50px rgb(23, 32, 90);
          border: 2px solid #2a3cad;

          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            transition: 0.5s;
            pointer-events: none;
          }

          &:hover:before {
            left: 0;
            transform: skewX(-5deg);
          }

          .content {
            position: relative;
            margin: auto;
            width: 100%;
            height: 100%;
            text-align: center;
            overflow: hidden;
            background: #50dfdb;
            border-radius: 8px;

            > img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              -webkit-user-drag: none;
            }
          }

          > span {
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            left: 0;
            top: 0;

            &:nth-child(1) {
              transform: rotate(0deg);
            }
            &:nth-child(2) {
              transform: rotate(90deg);
            }
            &:nth-child(3) {
              transform: rotate(180deg);
            }
            &:nth-child(4) {
              transform: rotate(270deg);
            }

            &::before {
              content: '';
              width: 100%;
              height: 10px;
              position: absolute;
              display: block;
              background: #50dfdb;
              animation: animate 4s linear infinite;
            }

            @keyframes animate {
              0% {
                transform: scaleX(0);
                transform-origin: left;
              }
              49.9% {
                transform: scaleX(1);
                transform-origin: left;
              }
              50.1% {
                transform: scaleX(1);
                transform-origin: right;
              }
              100% {
                transform: scaleX(0);
                transform-origin: right;
              }
            }
          }
        }
      }

      .flower_hint {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 500px;
        line-height: 32px;
        font-size: 18px;
        background-color: rgba(136, 134, 127, 0.5);
        padding: 20px;
        margin: 0;
        border-radius: 16px;
        color: #fff;
        letter-spacing: 2px;
        z-index: 100;
      }

      .bmh_bloom_hint {
        position: absolute;
        left: -50px;
        top: 300px;
        width: 400px;
        height: 400px;
      }
      .bmh_fruit {
        position: absolute;
        left: 260px;
        top: 770px;
        width: 100px;
        height: 100px;
      }
      .bmh_garden {
        position: absolute;
        left: 330px;
        top: 550px;
        width: 150px;
        height: 150px;
      }
      .xcj_bloom {
        position: absolute;
        left: 1100px;
        top: 400px;
        width: 300px;
        height: 260px;
      }
      .xcj_fruit {
        position: absolute;
        left: 790px;
        top: 580px;
        width: 100px;
        height: 100px;
      }
      .xcj_garden {
        position: absolute;
        left: 880px;
        top: 420px;
        width: 150px;
        height: 150px;
      }
      .xhh_bloom {
        position: absolute;
        left: 1260px;
        top: 750px;
        width: 300px;
        height: 150px;
      }
      .xhh_fruit {
        position: absolute;
        left: 1430px;
        top: 710px;
        width: 100px;
        height: 100px;
      }
      .xhh_garden {
        position: absolute;
        left: 1640px;
        top: 670px;
        width: 150px;
        height: 150px;
      }

      .xhh_seed {
        background: url(../../assets/image/xhh_seed.png) no-repeat 0 0;
        background-size: 100% 100%;
        position: absolute;
        left: 800px;
        top: 200px;
        width: 302.5px;
        height: 175px;
      }

      .xhh_sprout {
        background: url(../../assets/image/xhh_sprout.png) no-repeat 0 0;
        background-size: 100% 100%;
        position: absolute;
        left: 1200px;
        top: 200px;
        width: 302.5px;
        height: 175px;
        opacity: 0;
        transition: 1s;
      }

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

      .user {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;

        &-self {
          position: relative;
          width: 100%;
          height: 100px;
          padding: 20px 45px 20px 40px;
          background: url(../../assets/image/user-self-border.png) no-repeat center center;
          background-size: 100% 100%;

          &__wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #16a085;
            background-image: linear-gradient(90deg, #16a085 0%, #f4d03f 100%);
            border-radius: 8px;
            display: flex;

            .user-avatar {
              width: 60px;
              height: 100%;
              background-color: #f4d03f;
              background-image: linear-gradient(132deg, #f4d03f 0%, #16a085 100%);
              border-radius: 8px;

              &__wrapper {
                width: 100%;
                height: 100%;

                > img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }

            .user-info {
              width: 100px;
              height: 100%;
              padding: 2.5px;

              &__wrapper {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .user-name {
                  height: 20px;
                  line-height: 20px;
                  font-size: 14px;
                  color: #e0cc45;
                  font-weight: bold;
                }
                .user-rank {
                  height: 30px;
                  line-height: 30px;
                  font-size: 12px;
                  color: white;

                  > span {
                    font-size: 14px;
                    font-weight: bold;
                  }
                }
              }
            }

            .user-score {
              width: 65px;
              height: 100%;

              color: white;
              display: flex;
              flex-direction: column;
              justify-content: center;

              > span:nth-child(1) {
                display: block;
                text-align: center;
                font-size: 14px;
              }
              > span:nth-child(2) {
                display: 2000;
                font-style: italic;
                font-size: 24px;
                background-color: #fa8bff;
                background-image: linear-gradient(45deg, #fa8bff 0%, #2bd2ff 52%, #2bff88 90%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }

        &-level {
          position: relative;
          width: 100%;
          height: 120px;

          &__wrapper {
            width: 100%;
            height: 100%;
            display: flex;

            .level-icon {
              margin: auto;
              width: 100%;
              height: 110px;
              display: flex;
              justify-content: center;

              &__item {
                width: 100px;
                height: 100px;
                margin: 5px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;

                background: linear-gradient(
                  60deg,
                  #16a085,
                  #f4d03f,
                  #16a085,
                  #f4d03f,
                  #5073b8,
                  #1098ad,
                  #07b39b,
                  #6fba82
                );
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

                > img {
                  display: block;
                  margin: auto;
                  border-radius: 50%;
                  width: 90px;
                  height: 90px;
                  object-fit: cover;
                  -webkit-user-drag: none;
                }
              }
            }
          }
        }
      }

      .menu {
        position: absolute;
        top: 0;
        left: 300px;
        width: 500px;
        height: auto;

        &-wrapper {
          width: 100%;
          display: flex;
          justify-content: start;
          flex-wrap: wrap;
          &__item {
            width: 80px;
            height: 70px;
            margin: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .item-icon {
              width: 50px;
              height: 50px;

              &:hover {
                transform: scale(1.05);
              }
              > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                -webkit-user-drag: none;
              }
            }
            .item-name {
              flex: 1;
              width: 100%;
              font-size: 12px;
              color: #19c975;
              text-align: center;
            }
          }
        }
      }
    }

    &__blisters {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 300px;
      border: red solid 1px;
      z-index: 30;
    }

    &__turntable {
      z-index: 40;
    }

    &__rank {
      z-index: 40;
    }
  }

  .home-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
  }
}

@media (min-aspect-ratio: 16/9) {
  .wrapper {
    width: auto;
    height: 100vh;
  }
}

/* 弹跳 */
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px);
  }

  60% {
    transform: translateY(-10px);
  }
}

.bounce_anim {
  animation: 1s bounce;
}
</style>

<style lang="scss">
.blisters {
  position: absolute;
  background-color: #d4ff02;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  color: #1a8e00;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.5), 15px 25px 10px rgba(255, 255, 255, 0.05),
    15px 20px 20px rgba(255, 255, 255, 0.05);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 10px;
  //   left: 10px;
  //   width: 8px;
  //   height: 8px;
  //   border-radius: 50%;
  //   background: #fff;
  // }

  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: 5px;
  //   left: 20px;
  //   width: 10px;
  //   height: 10px;
  //   border-radius: 50%;
  //   background: #fff;
  // }
}

// @keyframes blisters_anim_1 {
//   33% {
//     transform: translateY(-5px);
//   }
//   66% {
//     transform: translateY(0);
//   }
//   100% {
//     transform: translateY(5px);
//   }
// }
</style>
