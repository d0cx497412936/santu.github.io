<template>
  <div class="design-content">
    <component :is="item.type" :item="item.attribute" :disabled="disabled" :isOperate="isOperate" :index="index"
      :isAnswer="isAnswer">
    </component>
    <slot></slot>
  </div>
</template>
<script>

import lineInput from '../children/lineInput/index.vue'
import lineRadio from '../children/lineRadio/index.vue'

export default {
  components: {
    lineInput,
    lineRadio,
  },
  props: {
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
    },
    isAnswer: {
      type: Boolean,
      default: false
    },
  }
}
</script>
<style scoped lang="scss">
.design-content {
  background-color: white;
}

:deep(.screenshotProof) {
  margin-top: 10px;

  img {
    width: 88px;
  }
}
</style>
