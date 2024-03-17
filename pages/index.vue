<template>
    <div class="panel-list">
        <div class="panel-list-menu" @click="goPage('/grid')">grid布局(pc&mobile)</div>
        <div class="panel-list-menu" @click="goPage('/listSort')">拖拽排序列表</div>
        <NuxtLink to="/scrolledDemo" class="panel-list-menu">滚动条组件封装(pc&mobile)</NuxtLink>
        <div class="panel-list-menu" @click="goPage('/design')">PC可视化表单配置示范</div>
    </div>
</template>
<script setup lang="ts">
const goPage = (path: string) => {
    navigateTo(path)
}
</script>

<style lang="scss">
.panel-list {
    padding: 16px;
}
</style>