<template>
    <div class="piano-wrap">
        <div class="piano-key-wrap">
            <div class="piano-key wkey" :class="{ 'active': item.isActive }" v-for="(item, index) in keyNotes"
                :key="item.notename" @click="toneMusic(item.notename)" :data-keyCode="item?.keyCode"
                :data-notename="item.notename" :data-index="index">
                <div class="keytip">
                    <div class="keyname">{{ item.keyCodeName }}</div>
                    <div class="notename"><span>{{ item.notename }}</span></div>
                    <div class="singname"><span>{{ item.singName }}</span></div>
                </div>
            </div>
            <div class="bkey-wrap " :class="[`bkey-wrap${index + 1}`, { 'active': item.isActive }]"
                v-for="(item, index) in keyBlackNotes" :key="index">
                <div class="piano-key bkey" v-for="note in item" :key="note.notename" :data-keyCode="note.keyCode"
                    @click="toneMusic(note.notename)">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineExpose, nextTick } from 'vue'
import keyCodeTable from './keyboardCode'
const emits = defineEmits(['keydown'])

const toneMusic = (noteName) => {
    emits('keydown', noteName)
}

const keyCodeMap = [
    [],
    [],
    ['49', '50', '51', '52', '53', '54', '55'], //c2-b2
    ['56', '57', '48', '81', '87', '69', '82'],//c3-b3
    ['84', '89', '85', '73', '79', '80', '65'], //c4-b4
    ['83', '68', '70', '71', '72', '74', '75'], //c5-b5
    ['76', '90', '88', '67', '86', '66', '78'], //c6-b6
]
const grentNotes = () => {
    const noteName = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const singName = ['do', 're', 'mi', 'fa', 'so', 'la', 'xi']
    const grentRankList = (rank) => {
        const list = []
        for (let index = 1; index <= 7; index++) {
            list.push({
                type: 'white',
                keyCodeName:keyCodeTable[keyCodeMap[rank][index - 1]],
                keyCode: keyCodeMap[rank][index - 1],
                notename: noteName[index - 1] + rank,
                singName: singName[index - 1],
                isActive: false,
            })
        }
        return list
    }
    let NotesList = []
    for (let index = 2; index <= 6; index++) {
        NotesList = NotesList.concat(grentRankList(index))
    }
    return NotesList
}
const keyNotes = ref(grentNotes())
const grentBlackNotes = () => {
    const noteName = ['C#', 'D#', 'F#', 'G#', 'A#']
    const grentRankList = (rank) => {
        const list = []
        for (let index = 1; index <= 5; index++) {
            list.push({
                type: 'black',
                keyCode: '',
                notename: noteName[index - 1] + rank,
                isActive: false,
            })
        }
        return list
    }
    let NotesList = []
    for (let index = 2; index <= 6; index++) {
        NotesList.push(grentRankList(index))
    }
    return NotesList
}
const keyBlackNotes = ref(grentBlackNotes())
const noteKeydown = (event) => {
    if (!event.repeat) {
        const keyCode = event.keyCode
        const pianoKeyElement = document.querySelector(`.piano-key[data-keyCode="${keyCode}"]`)
        if (!pianoKeyElement) return
        pianoKeyElement.classList.add('active')
        pianoKeyElement.click()
    }
}
const noteKeyup = (event) => {
    const keyCode = event.keyCode
    const pianoKeyElement = document.querySelector(`.piano-key[data-keyCode="${keyCode}"]`)
    if (!pianoKeyElement) return
    pianoKeyElement.classList.remove('active')
}
onMounted(() => {
    window.removeEventListener('keydown', noteKeydown)
    window.removeEventListener('keyup', noteKeyup)
    window.addEventListener('keydown', noteKeydown)
    window.addEventListener('keyup', noteKeyup)
})

const notesActive = (item, time, interval) => {
    setTimeout(() => {
        item.isActive = true
        setTimeout(() => {
            item.isActive = false
        }, interval ? interval * 1000 : 800);
    }, time * 1000);
}
const changeNotesActive = (notename, time, interval) => {
    for (let index = 0; index < keyNotes.value.length; index++) {
        const item = keyNotes.value[index];
        if (item.notename === notename) {
            notesActive(item, time, interval)
        }
    }
    for (let index = 0; index < keyBlackNotes.value.length; index++) {
        const item = keyNotes.value[index];
        if (item.notename === notename) {
            notesActive(item, time, interval)
        }
    }
}

defineExpose({
    changeNotesActive
})

</script>
<style lang="scss" scoped>
.read-the-docs {
    color: #888;
}

.piano-wrap {
    margin: 20px auto;
    position: relative;
    padding-bottom: 50px;
    text-align: left;
    .piano-key-wrap {
        overflow: hidden;
        position: relative;
        width: 1200px;
        height: 260px;
        margin:  auto;
        .wkey {
            display: inline-block;
            width: 2.7%;
            height: 100%;
            margin: 0 auto;
            background: linear-gradient(white 10%, rgb(251, 251, 251) 92%, rgb(220, 220, 220) 93%, white 97%);
            border: solid 1px #111;
            border-radius: 0 0 5px 5px;
            position: relative;

            &:active {
                background: linear-gradient(#eee 10%, #ddd 60%, #bbb 93%, #ccc 97%);
            }
        }

        .active {
            background: linear-gradient(#eee 10%, #ddd 60%, #bbb 93%, #ccc 97%);

        }

        .wkey-active {
            background: linear-gradient(#eee 10%, #ddd 60%, #bbb 93%, #ccc 97%);
        }

        .wkey:nth-child(-n+7) .singname {
            background: #ccccd6
        }

        .wkey:nth-child(-n+14):nth-child(n+8) .singname {
            background: #93b5cf
        }

        .wkey:nth-child(-n+21):nth-child(n+15) .singname {
            background: #a4cab6
        }

        .wkey:nth-child(-n+28):nth-child(n+22) .singname {
            background: #fbb957
        }

        .wkey:nth-child(-n+35):nth-child(n+29) .singname {
            background: #ee8055
        }

        .wkey:nth-child(36) .notename,
        .wkey:nth-child(36) .singname {
            background: #f07c82
        }

        .bkey-wrap {
            width: 20%;
            position: absolute;
            top: 0;
            height: 150px;
        }

        .bkey-wrap1 {
            left: 0;
        }

        .bkey-wrap2 {
            left: 20%;
        }

        .bkey-wrap3 {
            left: 40%;
        }

        .bkey-wrap4 {
            left: 60.3%;
        }

        .bkey-wrap5 {
            left: 80%;
        }

        .bkey {
            display: inline-block;
            width: 10%;
            height: 100%;
            background: linear-gradient(#000 10%, rgb(86, 86, 86) 85%, #000 90%);
            border-radius: 0 0 3px 3px;
            position: absolute;
            top: 0;
            overflow: hidden;

            &:active {
                background: linear-gradient(rgb(86, 86, 86) 10%, #000 90%, #222 100%);
            }
        }

        .keytip {
            width: 100%;
            color: #373737;
            text-align: center;
            font-size: 13px;
            position: absolute;
            bottom: 5%;

            .keyname {
                margin-bottom: 8px;
                font-size: 18px;
                font-weight: 700
            }

            .notename,
            .singname {
                display: block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-weight: 700;
                margin: 5px auto;
            }



        }

        .bkey-active {
            background: linear-gradient(rgb(86, 86, 86) 10%, #000 90%, #222 100%);
        }

        .bkey:nth-child(1) {
            left: 9%;
        }

        .bkey:nth-child(2) {
            left: 24%;
        }

        .bkey:nth-child(3) {
            left: 52%;
        }

        .bkey:nth-child(4) {
            left: 67%;
        }

        .bkey:nth-child(5) {
            left: 81%;
        }
    }
}

.note-track {
    display: block;
    min-height: 25px;
    margin: 20px auto;
    border: 1px solid #999;

    ul li {
        list-style: none;
        display: inline-block;
    }
}
</style>
