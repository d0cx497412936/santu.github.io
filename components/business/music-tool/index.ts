import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid'
export default function useMusicTool(Tone) {
    const activeMusicTrack = ref(0)
    const activeMusicTrackId = ref(0)
    const musicTrack: any = ref([])
    //Tone对象集合
    const synthMap = {

    }
    //传入音符，和需要变动的音高-1+1形式,传入c4,-1 得到c3
    const getNoteNameByPitch = (noteName: string, pitch: number) => {
        const noteNameStr = noteName.split('')
        const noteNumber = parseInt(noteNameStr[1]) + pitch
        return noteNameStr[0] + noteNumber
    }
    // 创建音频-默认钢琴
    const grentTrackItem = (instruments = "piano") => {
        const synth = new Tone.Sampler(
            {
                A0: "A0.mp3",
                C1: "C1.mp3",
                "D#1": "Ds1.mp3",
                "F#1": "Fs1.mp3",
                A1: "A1.mp3",
                C2: "C2.mp3",
                "D#2": "Ds2.mp3",
                "F#2": "Fs2.mp3",
                A2: "A2.mp3",
                C3: "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                A3: "A3.mp3",
                C4: "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                A4: "A4.mp3",
                C5: "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                A5: "A5.mp3",
                C6: "C6.mp3",
                "D#6": "Ds6.mp3",
                "F#6": "Fs6.mp3",
                A6: "A6.mp3",
                C7: "C7.mp3",
                "D#7": "Ds7.mp3",
                "F#7": "Fs7.mp3",
                A7: "A7.mp3",
                C8: "C8.mp3",
            }, {
            baseUrl: '/samples/piano/',
            onload: null
        }).toDestination();
        const id = uuidv4()
        musicTrack.value.push({
            id,
            instruments,
            noteTrackList: []
        })
        synthMap[id] = synth
        activeMusicTrackId.value = id
        activeMusicTrack.value = musicTrack.value.length - 1
    }
    grentTrackItem()
    const toggleActiveMusicTrack = (id: number, index: number) => {
        activeMusicTrackId.value = id
        activeMusicTrack.value = index
    }

    return {
        musicTrack,
        grentTrackItem,
        synthMap,
        activeMusicTrack,
        activeMusicTrackId,
        toggleActiveMusicTrack,
    }
}