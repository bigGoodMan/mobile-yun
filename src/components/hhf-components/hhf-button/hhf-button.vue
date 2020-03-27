<!-- 按钮 -->
<template>
  <div :class="['size-0', getBottomZIndexCls]">
    <div :class="wrapClasses" :style="wrapStyles" @click="handleClick">
      <div class="hhf-button-container flex-row flex-center">
        <template v-if="!$slots.loading && loading">
          <div class="hhf-button-loading-container">
            <div class="hhf-button-loading-content">
              <HhfIcon name="spinner-loading" />
            </div>
          </div>
        </template>
        <template v-else-if="loading">
          <slot name="loading"></slot>
        </template>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import HhfIcon from '../hhf-icon'
export default {
  name: '',
  props: {
    disabled: {
      // 禁用
      type: Boolean,
      default: false
    },
    loading: {
      // 加载
      type: Boolean,
      default: false
    },
    loadingText: {
      // 加载文字
      type: String,
      default: '加载中…'
    },
    text: {
      // 按钮文字
      type: String,
      default: '确定'
    },
    bottomZIndex: {
      type: Number
    },
    radius: String,
    activeColor: Object,
    plain: Boolean,
    type: {
      // 按钮类型
      type: String,
      default: 'default',
      validator (val) {
        return [
          'default',
          'primary',
          'success',
          'info',
          'warning',
          'danger'
        ].includes(val)
      }
    },
    size: {
      // 按钮尺寸
      type: String,
      default: 'normal',
      validator (val) {
        return ['normal', 'large', 'small', 'mini'].includes(val)
      }
    },
    classes: [String, Array],
    styles: Object
  },
  data () {
    return {}
  },

  components: {
    HhfIcon
  },

  computed: {
    getBottomZIndexCls () {
      return this.bottomZIndex ? `hhf-button-${this.size}-height` : null
    },
    wrapClasses () {
      const {
        classes,
        size,
        type,
        plain,
        loading,
        disabled,
        bottomZIndex
      } = this
      let cls = [
        'hhf-button',
        `hhf-button-${type}`,
        `hhf-button-${size}`,
        bottomZIndex ? `hhf-button-${size}-fixed` : null
      ]
      if (Object.prototype.toString.call(classes) === '[object Array]') {
        cls = cls.concat(classes)
      } else if (typeof classes === 'string') {
        const arrCls = classes.split(' ')
        cls = cls.concat(arrCls)
      }
      if (plain) {
        cls.push('hhf-button-plain')
      }
      if (loading) {
        cls.push('hhf-button-loading')
      }
      if (disabled) {
        cls.push('hhf-button-disabled')
      }
      return cls
    },
    wrapStyles () {
      const { styles, radius, bottomZIndex } = this
      let stl = {
        ...styles,
        borderRadius: radius,
        zIndex: bottomZIndex
      }
      return stl
    }
  },
  methods: {
    handleClick () {
      const { loading, disabled } = this
      if (!loading && !disabled) {
        this.$emit('trigger-click')
      }
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
fixed()
  position fixed
  bottom 0
  left 50%
  transform translateX(-50%)
cHeight(h)
  height rems(h)
default()
  &.hhf-button-plain
    color #323233
    background-color #ffffff
    border 1px solid #323233
success()
  &.hhf-button-plain
    color #52c427
    background-color #ffffff
    border 1px solid #52c427
info()
  &.hhf-button-plain
    color #1890fc
    background-color #ffffff
    border 1px solid #1890fc
warning()
  &.hhf-button-plain
    color #e6a23c
    background-color #ffffff
    border 1px solid #e6a23c
danger()
  &.hhf-button-plain
    color #f5222d
    background-color #ffffff
    border 1px solid #f5222d
.hhf-button
  position relative
  display inline-block
  box-sizing border-box
  user-select none
  &.hhf-button-disabled
    opacity 0.4
  &.hhf-button-loading, &.hhf-button-disabled
    &::before
      display none
  &::before
    content ''
    position absolute
    top 50%
    left 50%
    width 100%
    height 100%
    background-color #000000
    opacity 0
    border-radius inherit
    border inherit
    border-color #000
    transform translate(-50%, -50%)
  &:active::before
    opacity 0.1
.hhf-button-container
  height 100%
  width 100%
  line-height 1
.hhf-button-large-fixed
  fixed()
.hhf-button-large-height
  cHeight(100)
.hhf-button-large
  width 100%
  cHeight(100)
  font-size rems(32)
.hhf-button-normal-fixed
  fixed()
.hhf-button-normal-height
  cHeight(88)
.hhf-button-normal
  cHeight(88)
  min-width rems(176)
  padding 0 rems(30)
  font-size rems(28)
.hhf-button-small-fixed
  fixed()
.hhf-button-small-height
  cHeight(60)
.hhf-button-small
  cHeight(60)
  min-width rems(132)
  padding 0 rems(16)
  font-size rems(24)
.hhf-button-mini
  font-size rems(20)
.hhf-button-default
  color #323233
  background-color #fff
  border 1px solid #ebedf0
  default()
.hhf-button-success
  background-color #52c427
  color #ffffff
  border 1px solid #52c427
  success()
.hhf-button-info
  background-color #1890fc
  color #ffffff
  border 1px solid #1890fc
  info()
.hhf-button-warning
  background-color #e6a23c
  color #ffffff
  border 1px solid #e6a23c
  warning()
.hhf-button-danger
  background-color #f5222d
  color #ffffff
  border 1px solid #f5222d
  danger()
.hhf-button-loading-container
  margin-right rems(10)
  .hhf-button-loading-content
    position relative
    line-height 0
    display inline-block
    animation hhf-button-loading-rotate 1.5s linear infinite
@keyframes hhf-button-loading-rotate
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
</style>
