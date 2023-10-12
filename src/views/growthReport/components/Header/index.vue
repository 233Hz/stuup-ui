<script setup lang="ts"></script>

<template>
  <div class="text-center">
    <h1>
      <span class="header_year">2023</span>
    </h1>
    <p>
      <span class="header_title">上学期成长报告</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
.header_year {
  font-size: 160px;
  font-weight: 700;
  font-style: italic;
  background-image: linear-gradient(
    to bottom right,
    #f88a00 0%,
    #2594ff 20%,
    #fd3d7f 40%,
    #fca93c 60%,
    #916dff 80%,
    #00d2c9 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.header_title {
  font-size: 42px;
  font-weight: 600;
  background-image: linear-gradient(
    to right,
    #f88a00 0%,
    #2594ff 20%,
    #fd3d7f 40%,
    #fca93c 60%,
    #916dff 80%,
    #00d2c9 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-top: 20px;
}
</style>
