<template>
  <div class="home-container">
    <canvas id="canvas">您的浏览器版本过低,请升级浏览器</canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import imageBG from '@/assets/image/home_bg.png';
import bmhBloomBG from '@/assets/image/bmh_bloom.png';

onMounted(() => {
  main();
});

const main = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  debugger;
  const game = new Game(canvas);
  game.update();
  game.draw();
};

class Game {
  width: number;
  height: number;
  animationEl: AnimationEl;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.width = 1920;
    this.height = 1080;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.image = new Image();
    this.image.src = imageBG;
    this.animationEl = new AnimationEl();
  }

  update() {}

  draw() {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    requestAnimationFrame(this.draw);
  }
}

/**
 * 动画元素
 */
class AnimationEl {
  constructor() {}
}

let CANVAS_WIDTH: number, CANVAS_HEIGHT: number;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let bgImage = new Image();
bgImage.src = imageBG;

const initCanvas = () => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  CANVAS_WIDTH = canvas.width = 1920;
  CANVAS_HEIGHT = canvas.height = 1259;
  animate();
};

class BmhBloom {
  spiritWidth: number;
  spiritHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  degree: number;
  speed: number;
  constructor() {
    this.spiritWidth = 511;
    this.spiritHeight = 474;
    this.width = this.spiritWidth * 0.7;
    this.height = this.spiritHeight * 0.7;
    this.x = 0;
    this.y = 800;
    this.image = new Image();
    this.image.src = bmhBloomBG;
    this.degree = 0;
    this.speed = 0.1; //白梅花摇晃速度
  }
  update() {
    this.degree += this.speed;
    if (this.degree < -15 || this.degree > 0) {
      this.speed = -this.speed;
    }
  }

  draw() {
    ctx.save(); // 保存画布状态
    ctx.translate(0, this.y); // 设置旋转中心点为左下角
    ctx.rotate((this.degree * Math.PI) / 180); // 进行旋转
    ctx.drawImage(this.image, 0, 0, this.spiritWidth, this.spiritHeight, this.x, -this.height, this.width, this.height);
    ctx.restore(); // 恢复画布状态
  }
}

const bmhBloom = new BmhBloom();

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH * 2, CANVAS_HEIGHT * 2);
  ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  bmhBloom.update();
  bmhBloom.draw();
  requestAnimationFrame(animate);
};
</script>

<style scoped lang="scss">
.home-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;

  #canvas {
    image-rendering: pixelated;
    display: block;
    width: 100vw;
    height: auto;
    aspect-ratio: 16/9;
  }

  @media (min-aspect-ratio: 16/9) {
    #canvas {
      width: auto;
      height: 100vh;
    }
  }
  //   @media (aspect-ratio: 1/1), (max-aspect-ratio: 1/1) {
  //     #canvas {
  //       width: 100vw;
  //       height: auto;
  //     }
  //   }
}
</style>
