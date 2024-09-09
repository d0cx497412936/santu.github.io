<template>

    <div class="musicTool-container">
        <musicToolKeyboard @keydown="toneMusic" ref="toolKeyboard"></musicToolKeyboard>
    </div>
</template>
<script setup>
import musicToolKeyboard from './components/keyboard.vue'

import * as Tone from 'tone'
import { ref, provide, reactive } from 'vue'
import MusicTool from './index'
const musicState = reactive({
    speed: 100,
    duration: 4, //4分音符为单位
    meter: 4, //每小节4拍
    scrollWidth: 1600,
    timeActive: 0
})
provide('musicState', musicState)

const { synthMap, activeMusicTrackId } = MusicTool(Tone, musicState)

const toneMusic = (noteName) => {
    synthMap[activeMusicTrackId.value].triggerAttackRelease(noteName, "4n")
}
const toolKeyboard = ref(null)

</script>
<style lang="scss" scoped>
.musicTool-cloth {
    margin: 10px;
    display: flex;
    position: relative;

    .musicTool-track-item {
        margin: 10px 0;
        display: flex;
        width: 100%;
        border-radius: 4px;
        border: 2px solid transparent;

        .musicTool-track-item-content {
            flex: 1;
        }

        &.active {
            border: 2px solid #507AFC;
        }
    }

    .musicTool-track-board {
        width: 200px;

        .musicTool-track-board-item {
            font-size: 20px;
            font-weight: bold;
            min-width: 100px;
            padding: 10px 20px;
            border: 1px solid #ccc;
        }
    }

    .musicTool-track-list {
        flex: 1;
        margin: 0 20px;
        position: relative;
        overflow: hidden;
        border-top: 1px solid #D8D8D8;
        padding: 0 20px;
    }

    .cloth-scroller {
        min-height: 300px;
    }


}
</style>