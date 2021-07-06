

import { Store, } from "vuex";
import { IGlobalState } from "@/store";
import { Ref, onMounted, computed } from 'vue';
import _ from 'lodash'

export function useLoadMore(
    refreshElm: Ref<null | HTMLElement>,
    store: Store<IGlobalState>,
    type: string
) {
    let element: HTMLElement;
    // 滚动要防抖 cnpm i lodash @types/lodash -S
    onMounted(() => {
        element = refreshElm.value as HTMLElement
        element.addEventListener('scroll', _.debounce(loadMore, 2000))
    })
    function loadMore() {
        // 获取可是区域高度  卷去的高度 整个高度
        let containerHeigth = element.clientHeight;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        if (containerHeigth + scrollTop + 20 >= scrollHeight) {
            store.dispatch(type)
        }
    }

    const isLoading = computed(() => store.state.home.lessons.loading)

    const hasMore = computed(() => store.state.home.lessons.hasMore)

    return {
        isLoading,
        hasMore
    }
}