<template>
    <div class="question-header" :class="{ 'must': item.must, isOperate }">
        <div class="question-header-title" :class="{ 'title-edit': editTitle }">
            <div class="title-sort">{{ index }}、</div>
            <div class="title-name" @click="toggleEditTitle(true)">
                <blurInput v-model="item.title" :placeholder="item.placeholder" :is-focus="editTitle" v-if="editTitle"
                    @blur="toggleEditTitle(false)" />
                <h3 v-if="!editTitle">
                    <span>{{ item.title || item.placeholder }}</span>
                </h3>
            </div>
        </div>
    </div>
    <div class="question-header-commit">
        <blurInput v-model="item.description" type="textarea" :placeholder="item.descriptionPlaceholder"
            :is-focus="editDescription" v-if="editDescription" @blur="editDescription = false" />
        <p v-if="!editDescription" @click="toggleEditDescription">
            {{ item.description || item.descriptionPlaceholder }}
        </p>
    </div>
</template>
<script lang="ts" setup>
import blurInput from '../../components/blurInput.vue';
import { ref, inject } from 'vue'
const designState: any = inject('designState')

const props = defineProps({
    item: {
        type: Object,
        default: () => { }
    },
    index: {
        type: Number,
        default: 1
    },
    isOperate: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:title', 'update:commit'])

const editTitle = ref(false)
const toggleEditTitle = (value: boolean) => {
    if (designState.isAnswer) return
    editTitle.value = value
}

const editDescription = ref(false)
const toggleEditDescription = () => {
    if (designState.isAnswer) return
    editDescription.value = true
}
</script>
<style scoped lang="scss">
.question-header {
    background: #fff;
    border-radius: 20px;
    display: flex;

    &-title {
        flex: 1;
        display: flex;
        font-size: 16px;

        min-height: 40px;
        margin-right: 12px;
        border: 1px solid transparent;

        .title-sort {
            line-height: 40px;
        }

        .title-name {
            flex: 1;

            h3 {
                span {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }

        .title-risk {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;

            img {
                width: 16px;
                padding: 0;
                display: block;
                line-height: 0;
            }
        }


        h3,
        :deep(input) {
            font-size: 16px;
            font-weight: bolder;
            display: inline-block;
            border: 0;
            border-radius: 0;
            line-height: 40px;
            height: 40px;
            white-space: initial;
        border: 0
        }

        h3 {
            min-height: 40px;
            height: auto;
        }
    }

    .title-edit {
        // border: 1px solid #484848;
        border: 0;
        border-radius: 20px;
        // padding: 0 16px;
        padding: 0;
    }

}

.question-header-commit {
    margin-top: 6px;
    min-height: 30px;
    p,
    :deep(textarea) {
        box-sizing: border-box;
        padding: 8px;
        font-size: 15px;
        line-height: 18px;
        text-align: left;
        color: #484848;
        white-space: initial;
        border:0
    }

    p {
        border: 1px solid transparent;
        min-height: 36px;
        height: auto;
    }

}

.isOperate {

    .question-header-title:hover,
    .question-header-commit p:hover {
        // border: 1px dashed #484848;
        border:0;
        // border-radius: 20px;
    }

}

// 必填星号 暂时拿掉
// .must {

//     &::before {
//         content: '*';
//         color: red;
//         display: inline-block;
//         vertical-align: middle;
//         margin-right: 2px;
//         position: relative;
//         top: 12px;
//     }

// }
</style>
