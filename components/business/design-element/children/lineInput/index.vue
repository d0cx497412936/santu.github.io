<template>
  <div class="line-check" :class="{ 'must': item.must, 'isOperate': isOperate }">
    <qHeader :index="index" :item="item"></qHeader>
    <div class="line-check-content">
      <ul>
        <li v-for="(child, childIndex) in item.questions" :key="childIndex" :class="{ 'isEdit': editIndex == childIndex }"
          @click="toggleEdit(childIndex)">
          <div class="line-check-input">
            <div class="line-check-input-inner">
              <blurInput v-model="child.placeholder" type="textarea" placeholder="Please enter options "
                @blur="editIndex = -1" :is-focus="editIndex == childIndex" v-if="editIndex == childIndex" />
              <template v-else>
                <span>
                  {{ child.placeholder }}
                </span>
                <p v-if="designState.isView">{{  child.value }}</p>
                <input class="answer-input" v-model="child.value" :disabled="!designState.isAnswer" v-else />
              </template>
            </div>
          </div>
          <div class="line-check-close">
            <img src="../../images/close-line.png" @click="removeOptions(childIndex)" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import qHeader from '../qHeader/index.vue'
import blurInput from '../../components/blurInput.vue';
import { ref , inject } from 'vue'
const designState: any = inject('designState')

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


const editIndex = ref(-1)
const toggleEdit = (index: number) => {
  if (props.isOperate) {
    editIndex.value = index
  }
}
const removeOptions = (index: number) => {
  props.item.questions.splice(index, 1)
}
const addOptions = () => {
  props.item.questions.push({
    placeholder: "Please enter a sub-question" + (props.item.questions.length + 1),
    value: "",
  })
}
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
      overflow: hidden;
         p{
      display: inline-block;
    }
      .line-check-input {
        min-height: 30px;
        box-sizing: border-box;
        padding: 4px;
        border: 1px solid transparent;
        flex: 1;
        word-break: break-all;
        white-space: initial;
        display: flex;

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
      .answer-input{
        display: none;
      }

      .line-check-close {
        opacity: 1;
      }
    }
  }
}

.answer-input {
  border: 0;
  display: inline-block;
  border-bottom: 1px solid #484848;
  background-color: transparent;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  margin: 0 0 0 4px;
  padding: 0;
}
</style>