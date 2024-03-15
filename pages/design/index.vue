<template>
    <div>
        <BusinessDesignElement :initData="initData"></BusinessDesignElement>
    </div>
</template>
<script setup>
const initData = reactive({
    "title": '',
    "description": '',
    "outline": [],
    "contentList": [],
})
</script>