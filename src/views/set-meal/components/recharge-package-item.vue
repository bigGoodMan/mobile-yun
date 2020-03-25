<!-- 套餐项目 -->
<template>
  <div :class="['package-item flex-column flex-center', active, 'package-item-border']" @click="handleClick">
    <div class="left-top">
      <slot name="left-top"></slot>
    </div>
    <span :class="['size-26', 'weight-bold', checked ? 'color-f' : null]">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'RechargePackageItem',
  model: {
    prop: 'checked',
    event: 'trigger-change'
  },
  data () {
    return {}
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  },
  components: {},

  computed: {
    active () {
      return this.checked ? 'active' : null
    }
  },

  methods: {
    handleClick () {
      this.$emit('trigger-change', !this.checked)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.package-item
  width 100%
  padding rems(32) rems(16)
  min-height rems(140)
  box-sizing border-box
  &.active
    background-color $primary
    color #ffffff
  .left-top
    position absolute
    top rems(10)
    left rems(10)
    z-index 1
    font-size 0
  &.package-item-border
    border 1px solid #dddddd
</style>
