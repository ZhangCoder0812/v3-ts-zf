<template>
    <div class="home-header">
        <img src="@/assets/logo.png" alt />
        <!-- 
       vue2 v-model = input事件 + value
       vue3 v-model = onUpdate:modelValue事件  + modelValue
            默认是 modelValue vant文档写的是value 有问题
            v-model:xxx = onUpdate:xxx事件  + xxx
            vue3这样就可以写多个v-model

        这个category是外面传进来的 不应该双向绑定
        <van-dropdown-item v-model="category" :options="option1" />
        -->
        <van-dropdown-menu>
            <van-dropdown-item :modelValue="category" :options="options" @change="change" />
        </van-dropdown-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { CATEGORY_TYPES } from "../../typings/home";
export default defineComponent({
    props: {
        category: {
            // 这里加个断言 就是CATEGORY_TYPES类型 方便下面有提示
            // 不然下面使用时是number类型 就没有提示
            type: Number as PropType<CATEGORY_TYPES>
        }
    },
    emits: ["setCurrentCategory"], // 为了提示作用
    setup(props, context) {
        let state = reactive({
            options: [
                { text: "全部课程", value: CATEGORY_TYPES.ALL },
                { text: "react课程", value: CATEGORY_TYPES.REACT },
                { text: "vue课程", value: CATEGORY_TYPES.VUE },
                { text: "node课程", value: CATEGORY_TYPES.NODE }
            ]
        });
        function change(value: CATEGORY_TYPES) {
            context.emit("setCurrentCategory", value);
        }
        return {
            ...toRefs(state),
            change
        };
    }
});
</script>

<style lang="scss" >
.home-header {
    height: 65px;
    background: #2a2a2a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5%;
    position: fixed;
    top: 0;
    left: 0;
    width: 95%;
    img {
        height: 50px;
    }
    .van-dropdown-menu__title {
        color: #fff;
    }
    .van-dropdown-menu__bar {
        background: #2a2a2a;
    }
}
</style>
