<template>
    <div class="page">
        <client-only>
            <musicTool></musicTool>
        </client-only>
    </div>
</template>

<script setup>
import musicTool from '@/components/business/music-tool/index.vue'
</script>
<style lang="scss" scoped>
.page{
    width: 100%;
    height:100%;
    background:#dcdcdc;
    overflow-x: auto;
    text-align: center;
}
</style>