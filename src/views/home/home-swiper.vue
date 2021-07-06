<template>
  <van-swipe v-if="sliderList.length">
    <van-swipe-item v-for="l in sliderList" :key="l.url">
      <img :src="l.url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { IGlobalState } from "../../store";
import * as Types from "@/store/action-types";
export default defineComponent({
  async setup() {
    // 这里的async 配合Suspense使用
    let store = useStore<IGlobalState>();
    let sliderList = computed(() => store.state.home.sliders);
    // 缓存 如果数据没有获取过才获取
    if (sliderList.value.length === 0) {
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
    }
    return {
      sliderList
    };
  }
});
</script>
