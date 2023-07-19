<template>
  <div class="home-container">
    <canvas id="canvas1">您的浏览器版本过低,请升级浏览器</canvas>
    <img id="layer1" src="../../assets/image/home_bg.png" />
    <img id="animate1" src="../../assets/image/bmh_bloom.png" />
    <img id="animate2" src="../../assets/image/chicken_anim.png" />
    <img id="animate3" src="../../assets/image/butterfly_anim.png" />
    <img id="animate4" src="../../assets/image/bird_1_anim.png" />
    <img id="animate5" src="../../assets/image/bird_2_anim.png" />
    <img id="animate6" src="../../assets/image/squirrel_anim.png" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { BackGround } from './backGround.js';
import { BmhBloom, Chicken, Butterfly, Bird1, Bird2, Squirrel } from './animationEl.js';
import { BmhBloomHover } from './MouseHoverHandle.js';

onMounted(() => {
  main();
});

const main = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1920;
  canvas.height = 1080;
  let mouseCoord = {};
  canvas.addEventListener('mousemove', e => {
    mouseCoord.x = e.offsetX;
    mouseCoord.y = e.offsetY;
  });
  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTimer = 0;
  const animate = timestamp => {
    const detalTimer = timestamp - lastTimer;
    lastTimer = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(detalTimer);
    game.draw(ctx, mouseCoord);
    requestAnimationFrame(animate);
  };

  animate(0);
};

class Game {
  constructor(width, height, mouseX, mouseY) {
    this.width = width;
    this.height = height;
    this.backGround = new BackGround(this);
    this.animates = [
      new BmhBloom(this),
      new Chicken(this),
      new Butterfly(this),
      new Bird1(this),
      new Bird2(this),
      new Squirrel(this),
    ];
    this.hovers = [new BmhBloomHover(this)];
  }

  update(detalTimer) {
    this.animates.forEach(animate => animate.update(detalTimer));
  }

  draw(context, mouseCoord) {
    this.backGround.draw(context);
    this.animates.forEach(animate => animate.draw(context));
    this.hovers.forEach(hover => hover.draw(context, mouseCoord));
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
  #animate1,
  #animate2,
  #animate3,
  #animate4,
  #animate5,
  #animate6 {
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
