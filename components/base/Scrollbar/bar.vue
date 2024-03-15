<template>
  <transition name="scrollbar-fade">
    <div ref="instanceRef" :class="['scrollbar__bar', 'is-' + barConfig.key]" @mousedown="clickTrackHandler">
      <div ref="thumbRef" :class="['scrollbar__thumb', 'is-' + barConfig.key, { 'is-active': barModel.cursorDown }]"
        :style="thumbStyle" @mousedown="clickThumbHandler"></div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const props = defineProps({
  vertical: {
    type: Boolean,
    default: false
  },
  size: String,
  move: Number
})
const BAR_CONFIG = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}
const thumbRef: Ref<HTMLElement | null> = ref(null)
const instanceRef: Ref<HTMLElement | null> = ref(null)

const renderThumbStyle = (move = 0, size = '', bar: any) => {
  const style: any = {}
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}

const barModel: any = reactive({
  isActive: false,
  /**
   * 默认false, 用户鼠标点击时设置为true
   */
  cursorDown: false,
  cursorLeave: false,
  thumbPositionPercentage: 0,
  /**
   * 维护Bar的实时状态
   */
  barState: {}
})

const wrapper: any = inject('wrapper')
const barConfig = computed(() => {
  return BAR_CONFIG[props.vertical ? 'vertical' : 'horizontal']
})
const thumbStyle = computed(() => {
  return renderThumbStyle(
    props.move,
    props.size,
    barConfig.value
  )
})

const clickTrackHandler = (e: any) => {
  const thumb: any = thumbRef.value
  const instance: any = instanceRef.value
  if (!thumb || !instance) return

  const offset = Math.abs(e.target.getBoundingClientRect()[barConfig.value.direction] - e[barConfig.value.client])
  const thumbHalf = thumb[barConfig.value.offset] / 2
  const thumbPositionPercentage = ((offset - thumbHalf) * 100) / instance[barConfig.value.offset]

  wrapper.value[barConfig.value.scroll] = (thumbPositionPercentage * wrapper.value[barConfig.value.scrollSize]) / 100
}

/**
 * 响应鼠标的移动事件，触发wrapper的scroll
 */
const mouseMoveDocumentHandler = (e: any) => {
  if (!barModel.cursorDown) return
  const thumb: any = thumbRef.value
  const instance: any = instanceRef.value
  if (!thumb || !instance) return

  const prevPage = barModel.barState[barConfig.value.axis]

  if (!prevPage) return

  const offset = (instance.getBoundingClientRect()[barConfig.value.direction] - e[barConfig.value.client]) * -1
  const thumbClickPosition = thumb[barConfig.value.offset] - prevPage
  const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / instance[barConfig.value.offset]

  wrapper.value[barConfig.value.scroll] = (thumbPositionPercentage * wrapper.value[barConfig.value.scrollSize]) / 100
}
/**
 * 鼠标点击事件释放后，重置bar的移动距离为0
 */
const mouseUpDocumentHandler = () => {
  barModel.cursorDown = false
  barModel.barState[barConfig.value.axis] = 0
  // 注销鼠标移动事件监听
  document?.removeEventListener('mousemove', mouseMoveDocumentHandler)
}
const startDrag = (e: any) => {
  e.stopImmediatePropagation()
  barModel.cursorDown = true
  document?.addEventListener('mousemove', mouseMoveDocumentHandler)
  document?.addEventListener('mouseup', mouseUpDocumentHandler)

  document.onselectstart = () => false
}
/**
    * 支持用户鼠标点击触发scroll滚动
    */
const clickThumbHandler = (e: any) => {
  // prevent click event of middle and right button
  e.stopPropagation()
  if (e.ctrlKey || [1, 2].includes(e.button)) {
    return
  }
  startDrag(e)
  barModel.barState[barConfig.value.axis] =
    e.currentTarget[barConfig.value.offset] -
    (e[barConfig.value.client] - e.currentTarget.getBoundingClientRect()[barConfig.value.direction])
}
onUnmounted(() => {
  document?.removeEventListener('mouseup', mouseUpDocumentHandler)
})



</script>

<style lang="scss" scoped>
.scrollbar__bar {
  position: absolute;
  display: flex;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  background: inherit;
  transition: 300ms all;

  .scrollbar__thumb {
    position: relative;
    display: block;
    margin: auto 0;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: #111111;
    -webkit-transition: 0.3s background-color;
    transition: 0.3s all;

    &.is-vertical {
      width: 2px;
      top: 2px;
      margin: 0;
    }

    &.is-horizontal {
      height: 2px;
      left: 2px;

      &.is-active {
        height: 8px;
      }

      &::after {
        content: '';
        width: 100%;
      }
    }

    &.is-horizontal:hover {
      height: 4px;

      &.is-active {
        height: 8px;
      }
    }
  }
}

.scrollbar__bar.is-vertical {
  width: 12px;
  height: 100%;
}

.scrollbar__bar.is-horizontal {
  height: 12px;
  width: 100%;

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px;
    transform: translateX(0%);
    top: 5px;
    background: #dfdfdf;
    z-index: -1;
  }
}

.scrollbar-fade-enter-active {
  -webkit-transition: opacity 340ms ease-out;
  transition: opacity 340ms ease-out;
}

.scrollbar-fade-leave-active {
  -webkit-transition: opacity 120ms ease-out;
  transition: opacity 120ms ease-out;
}

.scrollbar-fade-enter-from,
.scrollbar-fade-leave-active {
  opacity: 0;
}
</style>
