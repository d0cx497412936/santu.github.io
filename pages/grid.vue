<template>
    <div class="grid-page">
        <BusinessCuratedGallery :model="item" v-for="(item, index) in data" :key="index"></BusinessCuratedGallery>
        <br />
    </div>
</template>
<script lang="ts" setup>
const data = [
    {
        title: '栅格展示',
        text: 'pc大图靠左',
        galleryTypeId: '5_L',
        content: {
            elements: [
                { image: 'image/1.jpg' },
                { image: 'image/2.jpg' },
                { image: 'image/3.jpg' },
                { image: 'image/4.jpg' },
                { image: 'image/5.jpg' }
            ]
        }
    },
    {
        title: '标题',
        text: 'pc大图靠右',
        galleryTypeId: '5_R',
        content: {
            elements: [
                { image: 'image/1.jpg' },
                { image: 'image/2.jpg' },
                { image: 'image/3.jpg' },
                { image: 'image/4.jpg' },
                { image: 'image/5.jpg' }
            ]
        }
    },
    {
        title: '标题',
        text: 'pc单图靠左',
        galleryTypeId: '1_L',
        content: {
            elements: [
                { image: 'image/1.jpg' },
            ]
        }
    }
]
</script>
<style lang="scss">
.grid-page {
    padding: 20px;
}
</style>