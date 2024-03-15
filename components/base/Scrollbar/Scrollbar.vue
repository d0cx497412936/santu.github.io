<template>
  <div ref="scrollbarRef" class="scrollbar" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
    <div ref="wrapRef" :class="[wrapClass, 'scrollbar__wrap', native ? '' : 'scrollbar__wrap--hidden-default']"
      @scroll="handleScroll" :style="wrapStyle">
      <component :is="tag" ref="resize" :class="['scrollbar__view', viewClass]" :style="viewStyle">
        <slot></slot>
      </component>
    </div>
    <template v-if="!native">
      <bar v-show="showHorizontal && scrollModel.showBar" :move="scrollModel.moveX" :size="scrollModel.sizeWidth" />
      <bar v-show="showVertical && scrollModel.showBar" :vertical="true" :move="scrollModel.moveY"
        :size="scrollModel.sizeHeight" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import Bar from './bar.vue'
const props = defineProps({
  direction: {
    type: String,
    default: 'horizontal',
    validator(val:string) {
      return ['horizontal', 'vertical'].includes(val)
    }
  },
  height: {
    type: [String, Number],
    default: ''
  },
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  native: {
    type: Boolean,
    default: false
  },
  wrapStyle: {
    type: [String, Array],
    default: ''
  },
  wrapClass: {
    type: [String, Array],
    default: ''
  },
  viewClass: {
    type: [String, Array],
    default: ''
  },
  viewStyle: {
    type: [String, Array],
    default: ''
  },
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  tag: {
    type: String,
    default: 'div'
  },
})
const emits = defineEmits(['scroll'])
const scrollbarRef: Ref<HTMLElement | null> = ref(null)
const wrapRef:Ref<HTMLElement|null> = ref(null)

const scrollModel = reactive(
  {
    sizeWidth: '0',
    sizeHeight: '0',
    moveX: 0,
    moveY: 0,
    hover: false,
    hasRightOffset: false,
    hasLeftOffset: false,
    showBar: false
  }
)
const handleMouseEnter = () => {
  scrollModel.hover = true
}
const handleMouseLeave = () => {
  scrollModel.hover = false
}
const handleScroll = () => {
  const wrap = wrapRef.value
  if (!wrap) return

  scrollModel.moveY = (wrap.scrollTop * 100) / wrap.clientHeight
  scrollModel.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth

  scrollModel.hasRightOffset =
    props.direction === 'horizontal'
    ? wrap.clientWidth + wrap.scrollLeft < wrap.scrollWidth
    : wrap.clientHeight + wrap.scrollHeight < wrap.scrollHeight
  scrollModel.hasLeftOffset = wrap.scrollLeft > 0

  emits('scroll', { moveX: scrollModel.moveX, moveY: scrollModel.moveY })
}

const update = () => {
  const wrap = wrapRef.value
  if (!wrap) return
  const heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight
  const widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth
  scrollModel.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
  scrollModel.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
  scrollModel.hasRightOffset =
    props.direction === 'horizontal'
      ? wrap.clientWidth + wrap.scrollLeft < wrap.scrollWidth
      : wrap.clientHeight + wrap.scrollHeight < wrap.scrollHeight
  scrollModel.hasLeftOffset = wrap.scrollLeft > 0
  scrollModel.showBar =
    props.direction === 'horizontal'
      ? wrap.clientWidth < wrap.scrollWidth
      : wrap.clientHeight < wrap.scrollHeight
}

const showHorizontal = computed(() => {
  return props.direction === 'horizontal'
})
const showVertical = computed(() => {
  return props.direction === 'vertical'
})
provide('wrapper', wrapRef)
provide('scrollbar', scrollbarRef)

onMounted(() => {
  if (props.native) return
  nextTick(() => {
    update()
  })
})
 
</script>

<style scoped>
.scrollbar {
  position: relative;
  height: 100%;
}

.scrollbar__wrap {
  overflow: auto;
  height: 100%;
}

.scrollbar__wrap--hidden-default {
  scrollbar-width: none;
}

.scrollbar__wrap--hidden-default::-webkit-scrollbar {
  display: none;
}
</style>
