<template>
    <div class="panel-list">
        <div class="panel-list-menu" @click="goPage('/grid')">grid布局(pc&mobile)</div>
        <NuxtLink to="/scrolledDemo" class="panel-list-menu">滚动条组件封装(pc&mobile)</NuxtLink>
        <div class="panel-list-menu" @click="goPage('/design')">PC可视化表单配置示范</div>
    </div>
</template>
<script setup lang="ts">
const goPage = (path:string) => {
    navigateTo(path)
}
</script>

<style lang="scss">
.panel-list {
    padding: 16px;
    text-align: center;
    &-menu {
        
        margin: auto auto 20px auto;
        border: 1px solid #dcdcdc;
        border-radius: 6px;
        line-height: 40px;
        text-align: center;
        display: block;
        max-width: 500px;
        color: #111;
        text-decoration: none;
        cursor: pointer;
    }
}
</style>