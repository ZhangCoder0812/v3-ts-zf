<template>
  <div>
    <!-- 首页头部 -->
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory" />
    <div class="home-container" ref="refreshElm">
      <!-- 轮播图 Suspense组件当数据回来时才展示-->
      <Suspense>
        <template #default>
          <HomeSwiper />
        </template>
        <template #fallback>
          <div>loading ...</div>
        </template>
      </Suspense>

      <!-- 课程列表 -->
      <HomeList :lessonList="lessonList" />
      <div v-if="isLoading">正在加载 ....</div>
      <div v-if="hasMore">我是有底线的</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import HomeHeader from "./home-header.vue";
import HomeList from "./home-list.vue";
import HomeSwiper from "./home-swiper.vue";
import { Store, useStore } from "vuex";
import { IGlobalState } from "@/store";
import { CATEGORY_TYPES } from "../../typings/home";
import * as Types from "@/store/action-types";
import { useLoadMore } from "@/hooks/useLoadMore";

// 专门为修改分类使用的
function useCategory(store: Store<IGlobalState>) {
  // 这里不用计算属性没有响应式
  let category = computed(() => store.state.home.currentCategory);
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  }
  return {
    category,
    setCurrentCategory
  };
}
// 列表
function useLessonList(store: Store<IGlobalState>) {
  let lessonList = computed(() => store.state.home.lessons.list);
  onMounted(() => {
    // 初始化加载 如果vuex中有数据了就不用加载了 切换tab避免频繁加载
    if (lessonList.value.length == 0) {
      store.dispatch(`home/${Types.SET_LESSON_LIST}`);
    }
  });
  return lessonList;
}
export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper
  },
  setup() {
    // 1. 获取vuex中的分类状态 有个更改状态的功能
    let store = useStore<IGlobalState>();
    let { category, setCurrentCategory } = useCategory(store);
    // 2.课程获取
    let lessonList = useLessonList(store);

    // 获取dom <null | HTMLElement>表示现在这个ref是null 但是过会页面加载完了是dom节点
    const refreshElm = ref<null | HTMLElement>(null);
    // 哪个元素滚动的时候加载更多 ， 触发哪个状态去获取更多数据
    const { isLoading, hasMore } = useLoadMore(
      refreshElm,
      store,
      `home/${Types.SET_LESSON_LIST}`
    );
    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading,
      hasMore
    };
  }
});
</script>

<style lang="scss" scoped>
.home-container {
  position: absolute;
  top: 65px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
}
</style>