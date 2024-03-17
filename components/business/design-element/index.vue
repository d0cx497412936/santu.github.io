<template>
    <div class="design-view" @click="closeSelect">
        <div class="design-content-panel" @click.stop="">
            <p style="text-align: center;">可视化组件配置</p>
            <div class="draggable-panel" :style="{ 'minHeight': contentList.length <= 0 ? '350px' : 0 }">
                <draggable v-model="contentList" :group="draggableOptions" transition-group="500" animation="100"
                    :sort="true" @start="onStart" @end="onEnd" @add="handleBoardClone" style="min-height: 300px;padding-bottom: 50px;">
                    <template #item="{ element, index }">
                        <div class="design-content-item" :class="{ 'no-border': selectedId === element.id }"
                            :key="element.id" @click="handleSelected(element, index + 1)">
                            <operate :item="element" :checked="selectedId === element.id" @delete="handleDelete"
                                :index="index">
                                <formContent :item="element" :index="index + 1" :isOperate="selectedId === element.id">
                                </formContent>
                            </operate>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
        <div class="design-dialog-panel" @click.stop="">
            <div class="panel-content">
                <div class="design-dialog-tab">
                    <ul>
                        <li class="li-active">题型</li>
                    </ul>
                </div>
                <div class="design-dialog-tab-box">
                    <board v-model="drag" :list="item.list" :name="item.name" v-for="(item, index) in boardList"
                        :key="index" @addItem="addItem">
                    </board>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch, provide, defineExpose, nextTick } from 'vue'
import board from './components/board.vue'
import formContent from './components/content.vue'
import operate from './components/operate.vue'
import draggable from "vuedraggable";
import { boardConfigList } from './config'

const draggableOptions = {
    name: 'checklist', pull: true, put: true
}
const props = defineProps({
    initData: {
        type: Object,
        default: () => { }
    },
})
const emits = defineEmits(['update'])
const drag = ref(false)
const boardList: any = ref([])
const selectedId = ref('')
const selectedItem: any = ref(null)
const contentList: any = ref([])
const tabActive = ref(0)
const haveOptionSettings = ref(false)
const designState = reactive({
    selectedItem,
    selectedIndex: 0,
    optionsSelected: -1,
    title: '',
    description: '',
    contentList,
})
provide('designState', designState)

const closeSelect = () => {
    haveOptionSettings.value = false
    if (tabActive.value === 2) tabActive.value = 0
    designState.selectedIndex = 0
    selectedId.value = ''
    selectedItem.value = null
}
const handleSelected = (item: any, index: number) => {
    if (item.attribute.haveOptionSettings) {
        haveOptionSettings.value = true
    } else {
        haveOptionSettings.value = false
        if (tabActive.value === 2) tabActive.value = 0
    }
    designState.selectedIndex = index
    selectedId.value = item.id
    selectedItem.value = item
}
const handleDelete = (item: any) => {
    const deleteIndex = contentList.value.findIndex((x: { id: string }) => x.id === item.id)
    if (item.id == designState.selectedItem?.id) {
        closeSelect()
    }
    contentList.value.splice(deleteIndex, 1)
}
const handleBoardClone = (item: any) => {
    handleSelected(contentList.value[item.newIndex], item.newIndex + 1)
}
const addItem = (data: any) => {
    contentList.value.push(data)
    nextTick(() => {
        handleSelected(contentList.value[contentList.value.length - 1], contentList.value.length)

        const lastItem = document.querySelectorAll('.design-content-item')[contentList.value.length - 1] as HTMLElement
        const top = lastItem?.offsetTop || 0
        if (top > 10) {
            document.querySelector('.el-main')?.scrollTo(0, top)
        }
    })
}

const onStart = () => {
    drag.value = true;
}
const onEnd = () => {
    drag.value = false;

}
const getData = () => {
    return {
        title: designState.title,
        description: designState.description,
        contentList: contentList.value
    }
}
const init = () => {
    if (props.initData?.contentList.length > 0) {
        contentList.value = JSON.parse(JSON.stringify(props.initData.contentList))
    }

    designState.title = props.initData.title || ''
    designState.description = props.initData.description || ''
}


onMounted(() => {
    boardList.value = boardConfigList
    init()
})
watch(() => props.initData, () => {
    init()
}, {
    deep: true
})
defineExpose(
    {
        getData
    }
)
</script>
<style scoped lang="scss">
.design-view {
    width: 100%;
    min-height: 500px;
    height: 100%;
    position: relative;
    padding: 5px 0;
    color: $color-black;

    .design-content-panel {
        width: 100%;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 300px;

        .draggable-panel {
            position: relative;
            padding: 20px;
            box-sizing: border-box;
        }
    }

    .design-dialog-panel {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        z-index: 9;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0px 4px 12px 0px #dcdcdc;

        .design-dialog-tab {
            ul li {
                display: inline-block;
                height: 41px;
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
                letter-spacing: 0px;
                text-align: center;
                color: #929292;
                padding: 10px 7px;
                box-sizing: border-box;
                cursor: pointer;
            }

            .li-active {

                position: relative;
                box-shadow: 0px -2px 0px 0px #FFDB00 inset;

            }

        }

        .design-dialog-tab-box {
            padding: 24px 16px;
            box-sizing: border-box;
        }
    }

    .design-content-list {
        min-height: 500px;
        display: block;
        width: 100%;
        position: relative;
    }

    .design-content-item {
        position: relative;
        border: 2px dashed #dcdcdc;
        border-radius: 10px;
        margin-bottom: 40px;
    }

    .no-border {
        border: 0
    }
}
</style>
<style lang="scss">
.screenshotProof {
    margin-top: 10px;

    img {
        width: 88px;
    }
}
</style>