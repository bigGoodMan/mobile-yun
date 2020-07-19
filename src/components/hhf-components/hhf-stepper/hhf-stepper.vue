<!-- 步进器 -->
<template>
  <div class="hhf-stepper">
    <div class="flex-row flex-center">
      <div :class="['hhf-stepper-left size-0']" @click="handleReduce">
        <HhfButton
          class="hhf-stepper-btn width-full height-full"
          size="custom"
          :disabled="leftDisabled"
        >
          <HhfIcon class="size-28 hhf-stepper-icon" name="reduce" />
        </HhfButton>
      </div>
      <div class="hhf-stepper-text flex-row flex-center">
        <input
          class="hhf-stepper-text-content size-24"
          :value="currentValue"
          type="tel"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        />
      </div>
      <div :class="['hhf-stepper-right size-0']" @click="handleAdd">
        <HhfButton
          class="hhf-stepper-btn"
          size="custom"
          :disabled="rightDisabled"
        >
          <HhfIcon class="size-28 hhf-stepper-icon" name="add" />
        </HhfButton>
      </div>
    </div>
  </div>
</template>

<script>
import HhfButton from "../hhf-button";
import HhfIcon from "../hhf-icon";
export default {
  name: "HhfStepper",

  components: {
    HhfIcon,
    HhfButton
  },
  model: {
    event: "trigger-input"
  },
  props: {
    value: [String, Number],
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: 0
    },
    reduceDisabled: {
      type: Boolean,
      default: false
    },
    addDisabled: {
      type: Boolean,
      default: false
    },
    integer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const currentValue = this.value;
    return {
      currentValue
    };
  },

  computed: {
    leftDisabled() {
      const { min, reduceDisabled, value } = this;
      return value !== "" && (value <= min || reduceDisabled);
    },
    rightDisabled() {
      const { max, addDisabled, value } = this;
      return value !== "" && (value >= max || addDisabled);
    }
  },
  watch: {
    value(currVal, beforeVal) {
      this.currentValue = this.handleFormat(currVal, beforeVal);
    }
    // currentValue (currVal) {
    //   this.$emit('trigger-input', currVal)
    //   this.$emit('trigger-change', currVal)
    // }
  },

  mounted() {},
  methods: {
    handleRange(val) {
      const { min, max } = this;
      return Math.min(Math.max(val, min), max);
    },
    handleFormat(currVal, beforeVal) {
      return new RegExp(`^-?[0-9]*${this.integer ? "" : "(\\.?[0-9]*)"}$`).test(
        currVal
      ) || currVal === ""
        ? currVal
        : beforeVal;
    },
    handleTrigger(val) {
      this.$emit("trigger-input", val);
      this.$emit("trigger-change", val);
    },
    handleInput(e) {
      let val = e.target.value;
      val = String(val).replace(/[^0-9.-]/g, "");
      //  this.handleFormat(e.target.value, this.currentValue)
      // val = val === '' ? val : this.handleRange(val)
      e.target.value = val;
      this.handleTrigger(val);
    },
    // 减少
    handleReduce() {
      const { leftDisabled, step, currentValue } = this;
      if (!leftDisabled) {
        const val = this.handleRange(currentValue - step);
        this.handleTrigger(val);
        this.$emit("trigger-reduce", val);
      }
    },
    // 增加
    handleAdd() {
      const { rightDisabled, step, currentValue } = this;
      if (!rightDisabled) {
        const val = this.handleRange(currentValue - 0 + step);
        this.handleTrigger(val);
        this.$emit("trigger-add", val);
      }
    },
    // 聚焦
    handleFocus() {
      this.$emit("trigger-focus", this.currentValue);
    },
    // 失焦
    handleBlur(e) {
      let val = this.handleFormat(e.target.value, this.currentValue);
      val = val === "" ? val : this.handleRange(val);
      e.target.value = val;
      this.handleTrigger(val);
      this.$emit("trigger-blur", val);
    }
  }
};
</script>
<style lang="stylus" scoped>
.hhf-stepper
  display inline-block
  .hhf-stepper-disabled
    opacity 0.4
.hhf-stepper-left, .hhf-stepper-right
  width rems(56)
  height rems(56)
  .hhf-stepper-btn
    height 100%
    background-color #f2f2f2
  .hhf-stepper-icon
    color #777777
.hhf-stepper-text
  width rems(80)
  white-space nowrap
  overflow hidden
  padding 0 rems(5)
  box-sizing border-box
  height rems(56)
  background-color #f2f2f2
  margin 0 rems(5)
.hhf-stepper-text-content
  display inline-block
  width 100%
  overflow hidden
  height 100%
  outline none
  background-color transparent
  border none
  margin 0
  padding 0
  text-align center
  line-height rems(56)
</style>
