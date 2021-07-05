<template>
    <div id="nav">
        <router-view></router-view>
        <van-tabbar route>
            <van-tabbar-item to="/">首页</van-tabbar-item>
            <van-tabbar-item to="/mine">课程</van-tabbar-item>
            <van-tabbar-item to="/profile">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
