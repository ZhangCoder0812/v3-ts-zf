<template>
    <div>
        {{ category }}
        <!-- 首页头部 -->
        <HomeHeader />
        <!-- 轮播图 -->
        <HomeList />
        <!-- 课程列表 -->
        <HomeSwiper />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import HomeHeader from "./home-header.vue";
import HomeList from "./home-list.vue";
import HomeSwiper from "./home-swiper.vue";
import { useStore } from "vuex";
import { IGlobalState } from "@/store";
export default defineComponent({
    components: {
        HomeHeader,
        HomeList,
        HomeSwiper,
    },
    setup() {
        let store = useStore<IGlobalState>();
        let category = computed(() => {
            return store.state.home.currentCategory;
        });
        console.log(122);
        console.log(category);
        return { category };
    },
});
</script>
