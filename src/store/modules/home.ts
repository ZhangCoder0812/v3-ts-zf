import { CATEGORY_TYPES, IHomeState, ISlider, ILesson, ILessons } from "@/typings/home";
import { Module } from "vuex";
import { IGlobalState } from "../index";
import * as Types from '../action-types'
import { getSliders, getLessons } from '@/api/home';

// 首页里应爱存哪些数据
const state: IHomeState = {
    currentCategory: CATEGORY_TYPES.ALL,
    sliders: [],
    lessons: {
        hasMore: true, //有没有更多数据
        loading: false, //默认没有正在加载
        offset: 0,
        limit: 5,
        list: [], // 当前已经显示的课程
    },
};

// Module里泛型的参数 <自己的状态，全局的状态>
const home: Module<IHomeState, IGlobalState> = {
    namespaced: true,
    state,
    mutations: { // 这里state不给类型可以推断出来 payload不给的话是any 鼠标放上去就看到了
        [Types.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
            state.currentCategory = payload
        },
        [Types.SET_SLIDER_LIST](state, payload: ISlider[]) {
            state.sliders = payload
        },
        [Types.SET_LOGDING](state, payload: boolean) {
            state.lessons.loading = payload
        },
        [Types.SET_LESSON_LIST](state, payload: ILessons) {
            state.lessons.list = [
                ...state.lessons.list,
                ...payload.list
            ]
            state.lessons.hasMore = payload.hasMore
            state.lessons.offset = state.lessons.offset + payload.list.length
        },
    },
    actions: {// 这里commit已经标识过了 上面的Module
        async [Types.SET_SLIDER_LIST]({ commit }) {
            let sliders = await getSliders<ISlider>()
            commit(Types.SET_SLIDER_LIST, sliders)
        },
        async [Types.SET_LESSON_LIST]({ commit }) {
            if (state.lessons.loading) {
                return;
            }
            if (!state.lessons.hasMore) {
                return;
            }
            // 开始加载数据
            commit(Types.SET_LOGDING, true)
            let lessons = await getLessons<ILesson>(
                state.currentCategory,
                state.lessons.offset,
                state.lessons.limit
            )
            commit(Types.SET_LESSON_LIST, lessons)
            commit(Types.SET_LOGDING, false)
        }
    }
};

export default home;
