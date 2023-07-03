<template>
  <div class="home-contaienr">
    <div class="lower_layer" />
    <div class="anim_layer">
      <div class="bmh_bloom">
        <div class="anim" />
      </div>
      <div class="butterfly">
        <div class="anim" />
      </div>
      <div class="squirrel">
        <div class="anim" />
      </div>
      <div class="bird_1">
        <div class="anim" />
      </div>
      <div class="bird_2">
        <div class="anim" />
      </div>
      <div class="chicken">
        <div class="anim" />
      </div>
    </div>
    <div class="upper_layer">
      <div class="user-level">
        <div class="box">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div class="content">
            <img :src="flower1" />
          </div>
        </div>
        <div class="box">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div class="content">
            <img :src="flower2" />
          </div>
        </div>
      </div>
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
    </div>
    <Header class="home-header" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { GARDEN_TYPE } from '@/utils/dict';
import Header from '@/layout/components/Header.vue';
import flower1 from '@/assets/flower_icons/bmh_bloom.jpg';
import flower2 from '@/assets/flower_icons/bmh_fruit.png';

const router = useRouter();
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

const flowerRects: Record<string, { x: number; y: number }> = {};

onMounted(() => {
  registerFlowerHint();
  // generateBlisters();
});

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

// const generateBlisters = (): void => {
//   const wrapper = document.querySelector('.upper_layer') as HTMLDivElement;
//   for (let i = 0; i < 1; i++) {
//     let blistersEl = document.createElement('div') as HTMLDivElement;
//     const score = Math.floor(Math.random() * 3) + 1;
//     let textNode = document.createTextNode(`+${score}`);
//     blistersEl.setAttribute('score', score.toString());
//     blistersEl.append(textNode);
//     blistersEl.classList.add('blisters');
//     const blistersDiameter: number = 50;
//     const x = `${Math.floor(Math.random() * (wrapper.offsetHeight - blistersDiameter * 2)) + blistersDiameter}px`;
//     const y = `${Math.floor(Math.random() * (wrapper.offsetWidth - blistersDiameter * 2)) + blistersDiameter}px`;
//     blistersEl.style.transform = `translate(${400}px, ${400}px)`;
//     wrapper.appendChild(blistersEl);
//   }

//   wrapper.addEventListener('click', (e: MouseEvent) => {
//     const target = e.target as HTMLDivElement;
//     if (target.classList.contains('blisters')) {
//       target.clientWidth;
//       target.style.transform = `translate(${800}px, ${200}px)`;
//       setInterval(() => {
//         const xhhSeedEl = document.querySelector('.xhh_seed') as HTMLDivElement;
//         const xhhSproutEl = document.querySelector('.xhh_sprout') as HTMLDivElement;
//         xhhSproutEl.style.opacity = '1';
//         xhhSeedEl.classList.add('bounce_anim');
//         target.remove();
//       }, 1000);
//     }
//   });
// };
</script>

<style scoped lang="scss">
.home-contaienr {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #d5d1c2;

  .lower_layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1259px;
    background: url(../../assets/image/home_bg.png) no-repeat center 0;
    background-size: 1920px 1259px;
    z-index: 0;
  }

  .anim_layer {
    position: absolute;
    left: 50%;
    top: 0;
    width: 1920px;
    height: 1259px;
    transform: translate(-50%);
    border: #d5d1c2 solid 1px;
    overflow: hidden;
    z-index: 10;

    .bmh_bloom {
      position: absolute;
      left: -50px;
      top: 460px;
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
      top: 360px;
      left: 880px;
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
      top: 360px;
      right: 200px;
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
    .bird_1 {
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
    .bird_2 {
      position: absolute;
      top: 490px;
      left: 260px;
      width: 200px;
      height: 200px;
      transform: scale(0.4);
      .anim {
        width: 100%;
        height: 100%;
        background: url(../../assets/image/bird_2_anim.png) no-repeat 0 0;
        animation: bird_2_anim 4s steps(12, end) infinite;
      }

      @keyframes bird_2_anim {
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

  .upper_layer {
    position: absolute;
    left: 50%;
    top: 0;
    width: 1920px;
    height: 1259px;
    transform: translate(-50%);
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
      font-size: 24px;
      background-color: rgba(136, 134, 127, 0.5);
      padding: 20px;
      margin: 0;
      border-radius: 16px;
      color: #fff;
      letter-spacing: 2px;
    }

    .bmh_bloom_hint {
      position: absolute;
      left: 0px;
      top: 460px;
      width: 350px;
      height: 400px;
    }
    .bmh_fruit {
      position: absolute;
      left: 260px;
      top: 900px;
      width: 100px;
      height: 100px;
    }
    .bmh_garden {
      position: absolute;
      left: 330px;
      top: 650px;
      width: 150px;
      height: 150px;
    }
    .xcj_bloom {
      position: absolute;
      left: 1100px;
      top: 480px;
      width: 300px;
      height: 300px;
    }
    .xcj_fruit {
      position: absolute;
      left: 790px;
      top: 680px;
      width: 100px;
      height: 100px;
    }
    .xcj_garden {
      position: absolute;
      left: 880px;
      top: 510px;
      width: 150px;
      height: 150px;
    }
    .xhh_bloom {
      position: absolute;
      left: 1260px;
      top: 900px;
      width: 300px;
      height: 150px;
    }
    .xhh_fruit {
      position: absolute;
      left: 1430px;
      top: 840px;
      width: 100px;
      height: 100px;
    }
    .xhh_garden {
      position: absolute;
      left: 1640px;
      top: 790px;
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
  }

  .home-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
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
  // animation: blisters_anim_1 3s infinite alternate-reverse linear;
  cursor: pointer;
  transition: 1s;

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

  // &:hover {
  //   transform: scale(1.05);
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
