<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <div class="bmh-bloom">
      <img :src="bmh_bloom" />
    </div>
    <div class="butterfly">
      <img :src="butterfly" />
    </div>
    <div class="squirrel">
      <img :src="squirrel" />
    </div>
    <div class="bird-1">
      <img :src="bird_1" />
    </div>
    <div class="bird-2">
      <img :src="bird_2" />
    </div>
    <div class="chicken">
      <img :src="chicken" />
    </div>
  </div>
</template>

<script setup lang="ts">
import bmh_bloom from '@/assets/image/HomeAnimation/bmh_bloom.png'
import butterfly from '@/assets/image/HomeAnimation/butterfly_anim.png'
import squirrel from '@/assets/image/HomeAnimation/squirrel_anim.png'
import bird_1 from '@/assets/image/HomeAnimation/bird_1_anim.png'
import bird_2 from '@/assets/image/HomeAnimation/bird_2_anim.png'
import chicken from '@/assets/image/HomeAnimation/chicken_anim.png'
</script>

<style>
@keyframes rotation_anim {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(10deg);
  }
}

@keyframes translationX_anim {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes translationY_anim {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>

<style scoped lang="scss">
.bmh-bloom {
  $bmh-width: 511px * 0.8;
  $bmh-height: 474px * 0.8;

  position: absolute;
  left: -50px;
  top: 300px;
  width: $bmh-width;
  height: $bmh-height;
  animation: 3s rotation_anim infinite alternate-reverse;
  transform-origin: left bottom;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.butterfly {
  $butterfly-frame: 8;
  $butterfly-size: 100px;

  position: absolute;
  top: 300px;
  left: 1000px;
  width: $butterfly-size;
  height: $butterfly-size;
  overflow: hidden;

  > img {
    width: $butterfly-size * $butterfly-frame;
    height: 100%;
    object-fit: 'cover';
    animation: translationX_anim 0.6s steps($butterfly-frame, end) infinite;
  }
}

.squirrel {
  $squirrel-frame: 8;
  $squirrel-size: 100px;

  position: absolute;
  top: 400px;
  right: 200px;
  width: $squirrel-size;
  height: $squirrel-size;
  overflow: hidden;

  > img {
    width: $squirrel-size * $squirrel-frame;
    height: 100%;
    object-fit: 'cover';
    animation: translationX_anim 4s steps($squirrel-frame, end) infinite;
  }
}

.bird-1 {
  $bird-1-frame: 8;
  $bird-1-size: 100px;

  @keyframes bird_move_anim {
    0% {
      left: -$bird-1-size;
    }
    100% {
      left: 1920px + $bird-1-size;
    }
  }

  position: absolute;
  top: 100px;
  left: 0;
  width: $bird-1-size;
  height: $bird-1-size;
  overflow: hidden;

  animation: bird_move_anim 10s infinite;

  > img {
    width: 100%;
    height: $bird-1-size * $bird-1-frame;
    object-fit: 'cover';
    animation: translationY_anim 0.6s steps($bird-1-frame, end) infinite;
  }
}

.bird-2 {
  $bird-2-frame: 12;
  $bird-2-size: 80px;

  position: absolute;
  top: 420px;
  left: 360px;
  width: $bird-2-size;
  height: $bird-2-size;
  overflow: hidden;

  > img {
    width: $bird-2-size * $bird-2-frame;
    height: 100%;
    object-fit: 'cover';
    animation: translationX_anim 4s steps($bird-2-frame, end) infinite;
  }
}

.chicken {
  $chicken-frame: 16;
  $chicken-size: 80px;

  position: absolute;
  top: 800px;
  left: 1000px;
  width: $chicken-size;
  height: $chicken-size;
  overflow: hidden;

  > img {
    width: $chicken-size * $chicken-frame;
    height: 100%;
    object-fit: 'cover';
    animation: translationX_anim 4s steps($chicken-frame, end) infinite;
  }
}
</style>
