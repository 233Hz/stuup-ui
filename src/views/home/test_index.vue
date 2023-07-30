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
    <img id="upgarde-background-border" src="../../assets/image/GrowthAnimation/background-border.png" />
    <img id="upgarde-background" src="../../assets/image/GrowthAnimation/background.png" />
    <img id="upgarde-board" src="../../assets/image/GrowthAnimation/board.png" />
    <img id="upgarde-barrel" src="../../assets/image/GrowthAnimation/barrel.png" />
    <img id="upgarde-spoon" src="../../assets/image/GrowthAnimation/spoon.png" />
    <img id="upgarde-flowing-water-anim" src="../../assets/image/GrowthAnimation/flowing-water-anim.png" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { BackGround } from './backGround.js';
import { AnimationEl, BmhBloom, Chicken, Butterfly, Bird1, Bird2, Squirrel } from './animationEl.js';
import { HoverHint, BmhBloomHover } from './MouseHoverHandle.js';
import { UpgradeUI } from './upgradeUI.js';

onMounted(() => {
  main();
});

const main = () => {
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = 1920;
  canvas.height = 1080;
  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTimer = 0;
  const animate = (timestamp: number) => {
    const detalTimer = timestamp - lastTimer;
    lastTimer = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(detalTimer);
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  animate(0);
};

class Game {
  width: number;
  height: number;
  backGround: BackGround;
  animates: AnimationEl[];
  upgradeUI: UpgradeUI;
  hovers: HoverHint[];
  constructor(width: number, height: number) {
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
    this.upgradeUI = new UpgradeUI(this);
    this.hovers = [new BmhBloomHover(this)];
  }

  update(detalTimer: number) {
    this.animates.forEach(animate => animate.update(detalTimer));
  }

  draw(context: CanvasRenderingContext2D) {
    this.backGround.draw(context);
    this.animates.forEach(animate => animate.draw(context));
    this.upgradeUI.draw(context);
    // this.hovers.forEach(hover => hover.draw(context, mouseCoord));
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
  #animate6,
  #upgarde-background-border,
  #upgarde-background,
  #upgarde-board,
  #upgarde-barrel,
  #upgarde-spoon,
  #upgarde-flowing-water-anim {
    display: none;
  }

  @media (min-aspect-ratio: 16/9) {
    #canvas1 {
      width: auto;
      height: 100vh;
    }
  }
}
</style>
