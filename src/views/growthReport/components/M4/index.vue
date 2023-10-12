<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import CustomItem from '../CustomItem/index.vue'
import CustomTag from '../CustomTag/index.vue'
</script>

<template>
  <div>
    <module-title
      title="审美与艺术修养"
      :background1="['bg-gradient-to-r from-[#916dff] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#916dff] to-[#050c19]']"
    />

    <custom-item background-color="#916dff1a" border-left-color="#916dff">
      <p>
        参加才艺活动次数
        <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">15</span>
        次
      </p>
    </custom-item>
    <custom-item background-color="#916dff1a" border-left-color="#916dff">
      <p>
        参加学校及以上组织的艺术社团
        <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">15</span>
        次
      </p>
    </custom-item>
    <custom-item background-color="#916dff1a" border-left-color="#916dff">
      <p>
        国家级获奖次数
        <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">15</span>
        次
      </p>
      <div>
        <custom-tag
          border-color="#916dff"
          text="xxx国家级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx国家级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx国家级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx国家级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx国家级比赛"
          class="mt-[10px] mr-[10px]"
        />
      </div>
    </custom-item>
    <custom-item background-color="#916dff1a" border-left-color="#916dff">
      <p>
        市级获奖次数
        <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">15</span>
        次
      </p>
      <div>
        <custom-tag
          border-color="#916dff"
          text="xxx市级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx市级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx市级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx市级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx市级比赛"
          class="mt-[10px] mr-[10px]"
        />
      </div>
    </custom-item>
    <custom-item background-color="#916dff1a" border-left-color="#916dff">
      <p>
        区（行）级获奖次数
        <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">15</span>
        次
      </p>
      <div>
        <custom-tag
          border-color="#916dff"
          text="xxx区（行）级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx区（行）级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx区（行）级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx区（行）级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx区（行）级比赛"
          class="mt-[10px] mr-[10px]"
        />
      </div>
    </custom-item>
    <custom-item background-color="#916dff1a" border-left-color="#916dff">
      <p>
        校级获奖次数
        <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">15</span>
        次
      </p>
      <div>
        <custom-tag
          border-color="#916dff"
          text="xxx校级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx校级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx校级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx校级比赛"
          class="mt-[10px] mr-[10px]"
        />
        <custom-tag
          border-color="#916dff"
          text="xxx校级比赛"
          class="mt-[10px] mr-[10px]"
        />
      </div>
    </custom-item>
  </div>
</template>

<style scoped lang="scss">
.tag {
  padding: 6px 12px;
  border: 1px solid #916dff;
  box-sizing: border-box;
  width: auto;
  display: inline-flex;
}
</style>
