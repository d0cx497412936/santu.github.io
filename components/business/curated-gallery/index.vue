<template>
  <div v-if="model" ref="galleryContainer" :class="['curated-gallery', `is-${containerVariant}`]">
    <div v-if="model.title" class="gallery-info-container">
      <div class="gallery-info-container__info">
        <div class="title">
          <h2> {{ model.title }} </h2>
        </div>
        <div class="description">
          <p> {{ model.text }}</p>
        </div>
      </div>
    </div>
    <div class="gallery-content" :class="{
    'is-five': model.galleryTypeId === '5_L',
    'is-five-r': model.galleryTypeId === '5_R',
    'is-one': model.galleryTypeId === '1_L',
    'is-one-r': model.galleryTypeId === '1_R',
    'is-two': model.galleryTypeId === '2',
    'is-eight': model.galleryTypeId === '8'
  }">
      <div class="gallery-item curated-gallery__content">
        <template v-for="(item, index) in availableElements" :key="index">
          <a v-if="item.image" class="curated-gallery__item">
            <img :src="item.image">
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, defineProps } from 'vue'
/**
 * title: 组件标题
 * text: 组件描述
 * galleryTypeId: 布局类型 '1_L' | '1_R' | '2' | '5_L' | '5_R' | '8'
 * content: 内容
 */
export interface PubCuratedGalleryModel {
  title: string
  text: string
  galleryTypeId: string
  content?: {
    elements: Array<any>
  }
}

const props = defineProps({
  model: {
    type: Object as PropType<PubCuratedGalleryModel>,
    default: () => {
      return {}
    },
    required: true
  }
})

const galleryContainer = ref<null | HTMLElement>()
const containerVariant = computed(() => {
  if (props.model?.galleryTypeId === '1_L') return 'left'

  if (props.model?.galleryTypeId === '1_R') return 'right'

  return 'center'
})

// 约定第一张图为高清大图时 摆放顺序的处理
const availableElements = computed(() => {
  const originElements = props.model.content?.elements || []
  const galleryTypeId = props.model.galleryTypeId
  if (galleryTypeId === '1_L' || galleryTypeId === '1_R')
    return originElements.slice(0, 1)

  else if (galleryTypeId === '5_L' || galleryTypeId === '5_R')
    return originElements.slice(0, 5)

  else if (galleryTypeId === '2')
    return originElements.slice(0, 2)

  else if (galleryTypeId === '8')
    return originElements.slice(0, 8)

  else
    return originElements
})

</script>

<style lang="scss">
@import './_mixins.scss';
</style>