<template>
    <div>
        <div class="chart" id="main"></div>
        <div id="map"
            style="position: relative; width: 100%; height: 400px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import useGenerateCharts from '@/composables/charts'
const { generateBarChart, generateMap } = useGenerateCharts(echarts)
onMounted(() => {
    if (process.client) {
        generateBarChart('main')
        generateMap('map')
    }
})

</script>

<style scoped>
.chart {
    height: 400px;
}
</style>
