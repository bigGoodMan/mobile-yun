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
import HhfIcon from "../hhf-icon";
export default {
  name: "",

  components: {
    HhfIcon
  },
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
      default: "加载中…"
    },
    text: {
      // 按钮文字
      type: String,
      default: "确定"
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
      default: "default",
      validator(val) {
        return [
          "default",
          "primary",
          "success",
          "info",
          "warning",
          "danger"
        ].includes(val);
      }
    },
    size: {
      // 按钮尺寸
      type: String,
      default: "normal",
      validator(val) {
        return ["normal", "large", "small", "mini", "custom"].includes(val);
      }
    },
    classes: [String, Array],
    styles: Object
  },
  data() {
    return {};
  },

  computed: {
    getBottomZIndexCls() {
      return this.bottomZIndex ? `hhf-button-${this.size}-height` : null;
    },
    wrapClasses() {
      const {
        classes,
        size,
        type,
        plain,
        loading,
        disabled,
        bottomZIndex
      } = this;
      let cls = [
        "hhf-button",
        `hhf-button-${type}`,
        `hhf-button-${size}`,
        bottomZIndex ? `hhf-button-${size}-fixed` : null
      ];
      if (Object.prototype.toString.call(classes) === "[object Array]") {
        cls = cls.concat(classes);
      } else if (typeof classes === "string") {
        const arrCls = classes.split(" ");
        cls = cls.concat(arrCls);
      }
      if (plain) {
        cls.push("hhf-button-plain");
      }
      if (loading) {
        cls.push("hhf-button-loading");
      }
      if (disabled) {
        cls.push("hhf-button-disabled");
      }
      return cls;
    },
    wrapStyles() {
      const { styles, radius, bottomZIndex } = this;
      const stl = {
        ...styles,
        borderRadius: radius,
        zIndex: bottomZIndex
      };
      return stl;
    }
  },

  mounted() {},
  methods: {
    handleClick() {
      const { loading, disabled } = this;
      if (!loading && !disabled) {
        this.$emit("trigger-click");
      }
    }
  }
};
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
    color $success
    background-color #ffffff
    border 1px solid $success
info()
  &.hhf-button-plain
    color $primary
    background-color #ffffff
    border 1px solid $primary
warning()
  &.hhf-button-plain
    color $warning
    background-color #ffffff
    border 1px solid $warning
danger()
  &.hhf-button-plain
    color $danger
    background-color #ffffff
    border 1px solid $danger
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
.hhf-button-custom
  height 100%
  width 100%
.hhf-button-default
  color #323233
  background-color #fff
  border 1px solid #ebedf0
  default()
.hhf-button-success
  background-color $success
  color #ffffff
  border 1px solid $success
  success()
.hhf-button-info
  background-color $primary
  color #ffffff
  border 1px solid $primary
  info()
.hhf-button-warning
  background-color $warning
  color #ffffff
  border 1px solid $warning
  warning()
.hhf-button-danger
  background-color $danger
  color #ffffff
  border 1px solid $danger
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
