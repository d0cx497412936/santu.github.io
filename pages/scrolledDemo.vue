<template>
    <div class="scroll-page">
        <!-- <BaseScrollbar>
            <div class="scrollerDemo">
                <img src="../public/image/1.jpg">
                <img src="../public/image/2.jpg">
                <img src="../public/image/3.jpg">
                <img src="../public/image/4.jpg">
                <img src="../public/image/5.jpg">
            </div>
        </BaseScrollbar>
        <div class="verticalDemo">
            <BaseScrollbar direction="vertical">
                <img src="../public/image/1.jpg">
                <img src="../public/image/2.jpg">
                <img src="../public/image/3.jpg">
                <img src="../public/image/4.jpg">
                <img src="../public/image/5.jpg">
            </BaseScrollbar>
        </div> -->
        <div class="scrollerDemo">
                <img src="../public/image/1.jpg">
                <img src="../public/image/2.jpg">
                <img src="../public/image/3.jpg">
                <img src="../public/image/4.jpg">
                <img src="../public/image/5.jpg">
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss">
.scroll-page{
    padding: 20px;
    position: relative;
    .scrollbar{
        border: 1px solid #ddd;
    }
}
.scrollerDemo {
    display: flex;
    position: relative;
    width: 100%;
    padding: 10px 10px 30px 10px;

    img,div {
        width: 300px;
        margin-right: 10px;
    }
}
.verticalDemo{
    width: 100%;
    max-width: 500px;
    height: 500px;
    margin: 20px auto;
    img{
        width: 100%;
        height: auto;
    }

}
</style>