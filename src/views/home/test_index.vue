<template>
  <div class="home-container">
    <canvas id="canvas1">您的浏览器版本过低,请升级浏览器</canvas>
    <img id="layer1" src="../../assets/image/home_bg.png" />
    <img id="animate1" src="../../assets/image/bmh_bloom.png" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { BackGround } from './backGround.js';
import { BmhAnimationEl } from './animationEl.js';

onMounted(() => {
  main();
});

const main = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1920;
  canvas.height = 1080;
  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  animate();
};

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.backGround = new BackGround(this);
    this.animate1 = new BmhAnimationEl(this);
    this.animates = [this.animate1];
  }

  update() {
    this.animates.forEach(animate => animate.update());
  }

  draw(context) {
    this.backGround.draw(context);
    this.animates.forEach(animate => animate.draw(context));
  }
}
</script>

<style scoped lang="scss">
.home-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;

  #canvas1 {
    image-rendering: pixelated;
    display: block;
    width: 100vw;
    height: auto;
    aspect-ratio: 16/9;
  }

  #layer1,
  #animate1 {
    display: none;
  }

  @media (min-aspect-ratio: 16/9) {
    #canvas1 {
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
