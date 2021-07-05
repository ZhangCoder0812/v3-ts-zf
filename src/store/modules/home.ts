import { CATEGORY_TYPES, IHomeState } from "@/typings/home";
import { Module } from "vuex";
import { IGlobalState } from "../index";

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
};

export default home;
