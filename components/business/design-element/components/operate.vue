<template>
  <div class="design-content-operate" :class="{ 'checked': checked }">
    <div class="design-content-box">
      <slot></slot>

    </div>
    <div class="design-content-operate-menu" v-if="checked">
      <ul>
        <li @click.stop="handleDelete">
          <!-- <ISvgIcon name="common-delete" width="24" height="24"></ISvgIcon> -->
          <el-icon style="vertical-align: middle">
            <Delete />
          </el-icon>
          <span>Delete</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  ElIcon,
} from "element-plus";
import { ref, inject, onMounted } from 'vue';
const designState: any = inject('designState')

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  index: {
    type: Number,
    default: 0
  },
  checked: {
    type: Boolean
  }
})
const logicalType = ['lineRadio', 'lineCheckbox']
const centerDialogVisible = ref(false)
const selectOptions = ref('')
const selectOutline = ref('')
const selectQuestion = ref('')
const questionList: any = ref([])
const setQuestionS = () => {
  selectQuestion.value = ''
  questionList.value = designState.contentList.filter((q: any, index:number) => q.attribute.outline === selectOutline.value && q.id !== props.item.id && index >= props.index)
}
const changeOptions = () => {
  const logical = props.item.attribute.logical[selectOptions.value] || ''
  if (logical?.outline) {
    selectOutline.value = logical.outline
    setQuestionS()
    selectQuestion.value = logical.questionId

  } else {
    selectOutline.value = ''
    selectQuestion.value = ''
    setQuestionS()
  }
}

const emits = defineEmits(['delete'])
const handleDelete = () => {
  emits('delete', props.item)
}
const save = () => {
  if (selectQuestion.value)
    props.item.attribute.logical[selectOptions.value] = {
      outline: selectOutline.value,
      questionId: selectQuestion.value
    }
  centerDialogVisible.value = false
}
onMounted(() => {
  setQuestionS()
})
</script>
<style scoped lang="scss">
.design-content-operate {
  padding: 16px 24px;
  border-radius: 20px;
  background-color: white;
  margin-top: 24px;
  cursor: pointer;

  &-box {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
  }

  &-menu {
    padding: 14px 0 0 0;
    border-top: 1px solid #EEE9DE;
    white-space: initial;
    word-break: break-all;

    li {
      display: inline-block;
      cursor: pointer;
      margin-right: 20px;
      font-size: 14px;

      &:last-child {
        margin-right: 0;
      }

      * {
        vertical-align: middle;
      }

      img {
        width: 24px;
      }

      .el-checkbox {
        --el-checkbox-input-border: #484848;
        --el-checkbox-bg-color: #ffffff;

        :deep(.el-checkbox__inner) {
          border: 1px solid #484848;
        }
      }

      .is-checked :deep(.el-checkbox__inner) {
        background-color: #484848;
      }

      :deep(.el-checkbox__label) {
        color: #111;
      }
    }
  }
}

.logical-setting {
  min-width: 900px;

  p {
    margin-bottom: 10px
  }
}

:deep(.el-dialog.is-align-center) {
  max-width: 80%;
}

:deep(.el-select .el-input__wrapper) {
  box-shadow: none;
}

:deep(.is-focus) {
  box-shadow: none !important;
}

.checked,
.design-content-operate:hover {
  // background: rgba(246, 246, 246, 1);
  box-shadow: 0px 4px 12px 0px #EEE9DE;
}</style>
