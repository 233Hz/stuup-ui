<template>
  <div class="home-container">
    <canvas id="canvas1">您的浏览器版本过低,请升级浏览器</canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import imageBG from '@/assets/image/home_bg.png';
import bmhBloom from '@/assets/image/bmh_bloom.png';

onMounted(() => {
  initCanvas();
});

let CANVAS_WIDTH: number, CANVAS_HEIGHT: number;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let bgImage = new Image();
bgImage.src = imageBG;

const initCanvas = () => {
  canvas = document.getElementById('canvas1') as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  if (window.innerWidth > window.innerHeight) {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerWidth * (9 / 16);
  } else {
    CANVAS_WIDTH = window.innerHeight;
    CANVAS_HEIGHT = window.innerHeight * (16 / 9);
  }
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
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
  rotate: number;
  constructor() {
    this.spiritWidth = 511;
    this.spiritHeight = 474;
    this.width = 511 * devicePixelRatio;
    this.height = 474 * devicePixelRatio;
    this.x = -10;
    this.y = 400;
    this.image = new Image();
    this.image.src = bmhBloom;
    this.rotate = Math.PI;
  }

  draw() {
    ctx.drawImage(this.image, 0, 0, this.spiritWidth, this.spiritHeight, this.x, this.y, this.width, this.height);
  }

  update() {
    ctx.save();
    ctx.translate(0, this.y + this.height);
    ctx.rotate(100);
    ctx.restore();
  }
}

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH * 2, CANVAS_HEIGHT * 2);
  ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const bmhBloom = new BmhBloom();
  bmhBloom.draw();

  requestAnimationFrame(animate);
};

let timerId: number;
window.onresize = () => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    if (window.innerWidth > window.innerHeight) {
      CANVAS_WIDTH = window.innerWidth;
      CANVAS_HEIGHT = window.innerWidth * (9 / 16);
    } else {
      CANVAS_WIDTH = window.innerHeight;
      CANVAS_HEIGHT = window.innerHeight * (16 / 9);
    }
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }, 500);
};
</script>

<style scoped lang="scss">
.home-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;

  #canvas1 {
    max-width: 100vw;
    max-height: 100vh;
  }
}
</style>
