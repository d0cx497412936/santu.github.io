<template>
  <div class="design-board">
    <div class="design-board-name">
      {{ name }}
    </div>
    <div class="design-board-list">
      <draggable v-model="boardList" animation="300" dragClass="dragClass" ghostClass="ghostClass"
        chosenClass="chosenClass" @start="onStart" @end="onEnd" :clone="handleClone" :sort='false'
        :group="draggableGroupOptions">
        <template #item="{ element, index }">
          <div class="design-board-item" :key="element.id"  @click="handleItemClick(element)">
            <p>
              <i><img :src="getImag(element.img)" width="16px" /></i>
              <span> {{ element.name }}</span>
            </p>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, reactive, defineEmits, onMounted, watch } from "vue"
import { getUUID } from '../utils'
import componentList from '../children/index'
import draggable from "vuedraggable";
const draggableGroupOptions = reactive({
  name: 'checklist', pull: 'clone', put: false
})
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  name: String,
  list: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['update:modelValue','clone','end','addItem'])
const boardList = ref([])
const getImag = (imgPath) => {
  return new URL(`../images/${imgPath}.png`, import.meta.url).href;
};
watch(() => props.list, () => {
  boardList.value = props.list
})
onMounted(() => {
  boardList.value = props.list

})
const handleClone = (origin) => {
  let data = JSON.parse(JSON.stringify(componentList[origin.type]))
  data.id = getUUID()
  emits('clone',data)
  return data
}
const handleItemClick = (element) => {
  let data = JSON.parse(JSON.stringify(componentList[element.type]))
  data.id = getUUID()
  emits('addItem', data)
}
const onStart = () => {
  emits('update:modelValue', true)
}
const onEnd = () => {
  emits('update:modelValue', false)
  emits('end')
}

</script>
<style scoped lang="scss">
.design-board {
  margin-bottom: 24px;

  &-name {
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    color: 000;
    margin-bottom: 16px;
  }

  &-item {
    box-sizing: border-box;
    height: 33px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    margin-bottom: 12px;
    color: #14151a;
    padding: 6px 8px;
    cursor: pointer;
    background: #F5F5F5;
    border-radius: 20px;

    p {
      display: flex;
    }

    i {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 3px;
    }

    img {
      vertical-align: middle;
      width: 16px;
      height: 16px;
    }

    span {
      display: block;
      flex: 1;
      text-align: center;
      line-height: 21px;

    }

    &:nth-child(2n) {
      margin-left: 10px;
    }
  }
}
</style>