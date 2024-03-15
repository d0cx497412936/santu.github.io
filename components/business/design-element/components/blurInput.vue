<template>
    <input v-if="type === 'input'" v-model="inputValue" v-focus="isFocus" v-bind="$attrs" @blur="handleBlur" />
    <textarea ref="textareaRef" :style="{ 'height': height }" v-if="type === 'textarea'" v-model="inputValue"
        v-focus="isFocus" v-bind="$attrs" @blur="handleBlur"></textarea>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, defineExpose, nextTick } from 'vue'
import calcTextareaHeight from '../utils/setTextHeight.js'
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    isFocus: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'input'
    }

})
const emits = defineEmits(['update:modelValue', 'change'])
const textareaRef: any = ref(null)
const height = ref('')
const getHeight = () => {
    nextTick(() => {
        height.value = calcTextareaHeight(textareaRef.value, 1, null).height;
    })
}
const inputValue = ref('')
const handleBlur = () => {
    emits('update:modelValue', inputValue.value)
}
onMounted(() => {
    if (props.modelValue) {
        inputValue.value = props.modelValue
        if (props.type === 'textarea') {
            getHeight()
        }
    }

})
const vFocus = {
    mounted: (el: any) => {
        el.focus()
        setTimeout(() => {
        el.select()
        },100)
    },
}
if (props.type === 'textarea') {
    watch(() => inputValue.value, () => {
        getHeight()
    })
}
defineExpose({
    vFocus
})
</script>
<style lang="scss" scoped>
input,
textarea {
    font-family: noto-ikea;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    border: 1px solid #484848;
    background-color: white;
    height: 32px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 32px;
    padding: 0 0 0 6px;
    resize: none;
    word-break: break-all;
    white-space: initial;
}

textarea {
    line-height: 20px;
    display: block;
}

input:focus,
textarea:focus {
    outline: none;
}
</style>