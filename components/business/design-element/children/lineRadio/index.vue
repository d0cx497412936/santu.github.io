<template>
  <div class="line-check" :class="{ 'must': item.must, 'isOperate': isOperate, 'isView': designState.isView }">
    <qHeader :index="index" :item="item" :isOperate="isOperate"></qHeader>
    <div class="line-check-content">

      <ul>
        <li v-for="(child, childIndex) in item.options" :key="childIndex"
          :class="{ 'isEdit': editIndex == childIndex, 'isActive': activeIndex == childIndex }"
          @click="toggleEdit(childIndex)">
          <div class="line-check-input">
            <span v-if="!designState.isView" @click="toggleActive(childIndex)"> <i>
                <Check />
              </i></span>
            <div class="line-check-input-inner">
              <blurInput v-model="child.name" type="textarea" placeholder="Please enter options " @blur="editIndex = -1"
                :is-focus="editIndex == childIndex" v-if="editIndex == childIndex" />
              <template v-else>
                <label @click="toggleActive(childIndex)">
                  {{ child.name }}
                </label>
              </template>

            </div>
          </div>
          <div class="line-check-close">
            <img src="../../images/close-line.png" @click="removeOptions(childIndex)" />
          </div>
        </li>
        <li class="line-check-add" @click="addOptions" v-if="isOperate">
          <el-icon>
            <Plus />
          </el-icon> <label>Add</label>
        </li>
      </ul>
    </div>
 
  </div>
</template>
<script lang="ts" setup>
import {
  ElIcon,
} from "element-plus";
import qHeader from '../qHeader/index.vue'
import blurInput from '../../components/blurInput.vue';
import { ref, inject, onMounted } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  index: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isOperate: {
    type: Boolean,
    default: false
  }
})

const designState: any = inject('designState')

const editIndex = ref(-1)
const activeIndex = ref(-1)
const toggleEdit = (index: number) => {
  if (designState.isView || designState.isAnswer) return
  if (props.isOperate) {
    editIndex.value = index
    designState.optionsSelected = index
  }
}
const toggleActive = (index: number) => {
  if (designState.isView) return
  if (designState.isAnswer) {
    props.item.defaultValue = props.item.options[index].name
    activeIndex.value = index
    if (props.item.logical && Object.keys(props.item.logical).length > 0) {
      Object.keys(props.item.logical).forEach((options: any) => {
        const question = designState.contentList.find((question: any) => question.id === props.item.logical[options].questionId)
        if (question) {
          question.show = props.item.defaultValue === options ? true : false
        }
      })
    }
    return
  }
}
const removeOptions = (index: number) => {
  props.item.options.splice(index, 1)
}
const addOptions = () => {
  props.item.options.push({
    name: "Option " + (props.item.options.length + 1),
    haveAfterText: false,
    afterText: "",
    afterTextRequired: false,
    afterTextFormat: "Unlimited format",
  })
}

onMounted(() => {
  if (designState.isAnswer && props.item.defaultValue) {
    activeIndex.value = props.item.options.findIndex((item: any) => item.name == props.item.defaultValue)
  }
})
</script>
<style scoped lang="scss">
.line-check {
  font-size: 14px;
  color: #000;
  white-space: nowrap;

  &-title {
    color: 000;
    margin-right: 15px;

    span {
      vertical-align: middle;
      display: inline-block;
    }
  }

  &-content {
    li {
      min-height: 30px;
      margin-bottom: 8px;
      display: flex;
      cursor: pointer;

      .line-check-input {
        min-height: 30px;
        box-sizing: border-box;
        padding: 4px;
        border: 1px solid transparent;
        flex: 1;
        word-break: break-all;
        white-space: initial;
        display: flex;
        cursor: pointer;

        &-inner {
          flex: 1;

          :deep(textarea) {
            box-sizing: border-box;

            background-color: transparent;
            padding: 0;
            font-size: 14px;
            word-break: break-all;
            white-space: initial;
            line-height: 20px;
            border: 0;
            border-radius: 0;
          }

          padding-right: 8px;

        }

        span {
          display: flex;
          align-items: center;
        }

        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 1px solid #484848;
          border-radius: 16px 16px;
          vertical-align: middle;
          margin-right: 12px;
          cursor: pointer;

          svg {
            display: none;
          }
        }
      }

      .input-inner-after {
        display: inline-block;
        margin-left: 4px;

        input {
          border: 0;
          border-bottom: 1px solid #484848;
          outline: none;
          background-color: transparent;
          margin: 0;
          padding: 0;
        }
      }

      .line-check-close {
        padding: 6px 2px;
        line-height: 1;
        opacity: 0;
        display: flex;
        align-items: center;

        img {
          width: 16px;
        }
      }


    }

    .isEdit {
      .line-check-input {
        border: 1px dashed #484848;
        background: #EEE9DE4D;
        border-radius: 20px;
      }

      .line-check-close {
        opacity: 1;
      }
    }

    .isActive {
      i svg {
        display: inline-block !important;
      }
    }

    .line-check-add {
      padding: 4px 0 0 8px;
      line-height: 1;
      height: auto;
      display: inline-block;
      cursor: pointer;

      * {
        display: inline-block;
        vertical-align: middle;
        color: #111;
        font-size: 14px;

      }

      label {
        margin-left: 4px;
      }
    }

  }
}

.isOperate {
  .line-check-content li {
    &:hover {

      .line-check-input {
        border: 1px dashed #484848;
        background: #EEE9DE4D;
        border-radius: 20px;
      }

      .line-check-close {
        opacity: 1;
      }
    }
  }
}

.isView {
  .line-check-content {
    li {
      label {
        color: #929292;
      }

      .input-inner-after p {
        display: inline-block;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
        color: #929292;

      }
    }

    .isActive {
      label {
        color: #111;
      }
    }
  }
}
</style>