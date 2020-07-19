<!-- 套餐项目 -->
<template>
  <div
    :class="[
      'package-item flex-column flex-center',
      active,
      'package-item-border',
      disabledCls
    ]"
    @click="handleClick"
  >
    <div class="left-top">
      <slot name="left-top"></slot>
    </div>
    <span
      :class="[
        'size-26',
        'weight-bold',
        checked ? 'color-f' : null,
        disabled ? 'color-9' : null
      ]"
      >{{ text }}</span
    >
  </div>
</template>

<script>
export default {
  name: "RechargePackageItem",
  components: {},
  model: {
    prop: "checked",
    event: "trigger-change"
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },

  computed: {
    active() {
      return this.checked ? "package-item-active" : null;
    },
    disabledCls() {
      return this.disabled ? "package-item-disabled" : null;
    }
  },

  mounted() {},

  methods: {
    handleClick() {
      this.$emit("trigger-click");
    },
    handleChange() {
      this.$emit("trigger-change", !this.checked);
    }
  }
};
</script>
<style lang="stylus" scoped>
.package-item
  width 100%
  padding rems(32) rems(16)
  min-height rems(140)
  box-sizing border-box
  &.package-item-active
    background-color $primary
    color #ffffff
  &.package-item-disabled
    background-color $disabled
  .left-top
    position absolute
    top rems(10)
    left rems(10)
    z-index 1
    font-size 0
  &.package-item-border
    border 1px solid #dddddd
</style>
